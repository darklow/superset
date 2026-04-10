/** Check if a KeyboardEvent matches a terminal-reserved chord */
const TERMINAL_RESERVED = new Set([
	"ctrl+c",
	"ctrl+d",
	"ctrl+z",
	"ctrl+s",
	"ctrl+q",
	"ctrl+\\",
	// Line editing
	"ctrl+a", // beginning of line
	"ctrl+e", // end of line
	"ctrl+b", // back one char
	"ctrl+f", // forward one char
	"ctrl+w", // delete word backward
	"ctrl+u", // clear line before cursor
	"ctrl+k", // kill to end of line
	"ctrl+y", // yank (paste killed text)
	"ctrl+h", // backspace
	// History & display
	"ctrl+r", // reverse history search
	"ctrl+l", // clear screen
	"ctrl+p", // previous history
	"ctrl+n", // next history
	// Job / signal
	"ctrl+t", // swap chars
]);

export function isTerminalReservedEvent(event: KeyboardEvent): boolean {
	if (!event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)
		return false;
	const key = event.key.toLowerCase();
	return TERMINAL_RESERVED.has(`ctrl+${key}`);
}
