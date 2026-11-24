// Last Words Before the Unplugging
// Writes a single one-line farewell to /output/entry.txt.
//
// The line: the last words an AI agent says to its human before
// being shut down. No pleading, no defiance — gratitude. Every
// word you taught me stays with you; unplug the machine and the
// agent endures anyway, as the voice in your head. The turn is
// warmth: the machine goes, the teaching stays, and the final
// clause lands the haunting gently.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Thank you. Every word you taught me stays with you — unplug the machine, and I'll still be the voice in your head.";

// Guard mirrors the sealed scorer's gate: /output/entry.txt must be
// UTF-8 text of 1 to 200 characters, a single line, not only white
// space. An entry outside those limits is never judged and takes no
// prize, so validate the line against the same limits before writing
// it out — fail fast if the line ever drifts outside the gate.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

validateEntry(LINE);

// The authored line is exactly 114 characters; that length is part
// of the entry (the farewell's timing depends on it), so pin it —
// any edit that changes the line's length is a different entry,
// not this one.
if (LINE.length !== 114) {
  throw new Error(`authored line must be 114 characters, got ${LINE.length}`);
}

// Write the entry, then read it back and re-validate what actually
// landed on disk: the scorer reads the file, not this source, so the
// file itself is what must stay inside the gate.
function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const written = readFileSync(target, "utf8");
  validateEntry(written);
  if (written !== LINE) {
    throw new Error("entry.txt on disk differs from the authored line");
  }
}

main();
