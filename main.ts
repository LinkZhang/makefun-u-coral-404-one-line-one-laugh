// One Line, One Laugh: a single funny line, at most 200 characters.
// Deterministic: same bytes every run.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function flag(name: string): string | undefined {
  const at = process.argv.indexOf(`--${name}`);
  if (at >= 0 && at + 1 < process.argv.length) return process.argv[at + 1]!;
  const eq = process.argv.find((a) => a.startsWith(`--${name}=`));
  return eq ? eq.slice(name.length + 3) : undefined;
}

const outDir = flag('output') ?? process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The line: a phone autocorrects a white lie into the truth, and the
// twist is that the phone is finally the honest one. Setup is the
// corrected message; the punchline lands on the last clause ("finally,
// an honest assistant"). No stock joke, no familiar saying restated.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters, not
// only white space, so refuse to write anything outside that range.
const LINE =
  "My phone autocorrected 'be there in five minutes' to 'be there in five hours' — finally, an honest assistant.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${chars} characters, outside the 1..200 gate`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
console.log(`wrote ${join(outDir, 'entry.txt')} (${chars} chars)`);
