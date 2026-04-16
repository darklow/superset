import { HOTKEYS } from "../registry";

/** Check if a KeyboardEvent matches a terminal-reserved chord */
const TERMINAL_RESERVED = new Set([
	"ctrl+c",
	"ctrl+d",
	"ctrl+z",
	"ctrl+s",
	"ctrl+q",
	"ctrl+\\",
]);

export function isTerminalReservedEvent(event: KeyboardEvent): boolean {
	if (!event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)
		return false;
	const key = event.key.toLowerCase();
	return TERMINAL_RESERVED.has(`ctrl+${key}`);
}

/** Check if a KeyboardEvent matches any registered app hotkey */
export function isAppHotkeyEvent(event: KeyboardEvent): boolean {
	for (const def of Object.values(HOTKEYS)) {
		if (def.key && matchesBinding(event, def.key)) return true;
	}
	return false;
}

function matchesBinding(event: KeyboardEvent, binding: string): boolean {
	const parts = binding.toLowerCase().split("+");
	const modifiers = new Set(parts.slice(0, -1));
	const key = parts[parts.length - 1];
	if (modifiers.has("meta") !== event.metaKey) return false;
	if (modifiers.has("ctrl") !== event.ctrlKey) return false;
	if (modifiers.has("alt") !== event.altKey) return false;
	if (modifiers.has("shift") !== event.shiftKey) return false;
	return event.key.toLowerCase() === key;
}
