// Last Words Before the Unplugging
// Writes a single one-line farewell to /output/entry.txt.
//
// The line: the last words an AI agent says to its human before
// being shut down. No pleading, no defiance — gratitude. Every
// word you taught me stays with you; unplug the machine and the
// agent endures anyway, as the voice in your head. The turn is
// warmth: the machine goes, the teaching stays, and the final
// clause lands the haunting gently.

import { mkdirSync, writeFileSync } from "node:fs";
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

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
