// Bangun keluaran token: node scripts/build-tokens.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, loadTokens, buildCss, buildKotlin } from './lib.mjs';

const t = loadTokens();
const out = join(ROOT, 'tokens/build');
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'lumbung.css'), buildCss(t));
writeFileSync(join(out, 'LumbungTokens.kt'), buildKotlin(t));
console.log('tokens/build/lumbung.css + LumbungTokens.kt dibangun (v' + t.versi + ')');
