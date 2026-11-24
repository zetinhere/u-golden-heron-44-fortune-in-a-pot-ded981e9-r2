// Fortune in a Pot — make.fun entry (round 2 rebuild, fresh implementation).
//
// The program writes exactly one fortune, one line, 1-120 characters,
// to /output/entry.txt. The fortune is written for the houseplant on the
// windowsill: kind, funny, and phrased as a prediction about the plant's
// own future.
//
// Run: node main.ts        (Node 22.18+ runs TypeScript directly)

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

// The fortune. A prediction ("By spring you will..."), a small joke that
// lands (the plant, not the keeper, picked the spot), warm to both plant
// and keeper, and written for THIS plant in THIS window — "this
// windowsill" names the sill the judge's gardener is looking at, where
// "the sunny spot" could have been any room in the house.
const FORTUNE =
  "By spring you will outgrow this pot, and your keeper will finally admit this windowsill was your idea all along.";

const MAX_CHARS = 120;
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  // The gate counts characters, so validate before writing anything.
  const chars = [...FORTUNE].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(
      `fortune is ${chars} characters, must be 1-${MAX_CHARS}`,
    );
  }
  if (FORTUNE.trim() !== FORTUNE || /\n/.test(FORTUNE)) {
    throw new Error("fortune must be a single clean line");
  }

  // Writable by every user, as the grader collects /output as another user.
  process.umask(0o022);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, FORTUNE, "utf8");
  chmodSync(OUT_FILE, 0o644);

  console.log(`wrote ${chars} characters to ${OUT_FILE}`);
  console.log(FORTUNE);
}

main();
