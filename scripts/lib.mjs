import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const loadTokens = () =>
  JSON.parse(readFileSync(join(ROOT, 'tokens/lumbung.tokens.json'), 'utf8'));

const lin = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
export const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
};
export const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

export function buildCss(t) {
  const L = [`/* Dihasilkan oleh scripts/build-tokens.mjs dari tokens/lumbung.tokens.json (v${t.versi}). Jangan edit. */`, ':root {'];
  for (const [k, v] of Object.entries(t.color)) L.push(`  --lumbung-${k}: ${v};`);
  for (const [k, v] of Object.entries(t.font)) L.push(`  --lumbung-font-${k}: ${v};`);
  for (const [k, v] of Object.entries(t.type)) {
    L.push(`  --lumbung-type-${k}-size: ${v.size}px;`);
    L.push(`  --lumbung-type-${k}-line: ${v.line}px;`);
    L.push(`  --lumbung-type-${k}-weight: ${v.weight};`);
    L.push(`  --lumbung-type-${k}-family: var(--lumbung-font-${v.family});`);
  }
  for (const [k, v] of Object.entries(t.radius)) L.push(`  --lumbung-radius-${k}: ${v}px;`);
  for (const [k, v] of Object.entries(t.space)) L.push(`  --lumbung-space-${k}: ${v}px;`);
  for (const [k, v] of Object.entries(t.size)) L.push(`  --lumbung-size-${k}: ${v}px;`);
  L.push('}', '');
  L.push('.lumbung-angka-timbang { font-variant-numeric: tabular-nums; }', '');
  return L.join('\n');
}

const camel = (s) =>
  s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/^(\d)/, '_$1');
const pascal = (s) => camel(s).replace(/^./, (c) => c.toUpperCase());

export function buildKotlin(t) {
  const L = [
    `// Dihasilkan oleh scripts/build-tokens.mjs dari tokens/lumbung.tokens.json (v${t.versi}). Jangan edit.`,
    '// Tanpa dependensi Compose: warna = ARGB Long, ukuran = angka dp/sp polos.',
    '// Di app-kmp: Color(LumbungTokens.Color.hijauDaun), Radius.tombol.dp, dst.',
    'package id.codingskuy.lumbung.design',
    '',
    'object LumbungTokens {',
    `    const val VERSI = "${t.versi}"`,
    '',
    '    object Color {',
  ];
  for (const [k, v] of Object.entries(t.color)) L.push(`        const val ${camel(k)}: Long = 0xFF${v.slice(1).toUpperCase()}`);
  L.push('    }', '', '    object Font {');
  for (const k of Object.keys(t.font)) L.push(`        const val ${camel(k)}: String = "${k === 'mono' ? 'monospace' : 'sansserif'}"`);
  L.push('    }', '');
  for (const [k, v] of Object.entries(t.type)) {
    L.push(`    object Type${pascal(k)} {`);
    L.push(`        const val SIZE_SP = ${v.size}`, `        const val LINE_SP = ${v.line}`, `        const val WEIGHT = ${v.weight}`,
      `        const val FAMILY = "${v.family === 'mono' ? 'monospace' : 'sansserif'}"`, `        const val TABULAR = ${v.tabular ? 'true' : 'false'}`, '    }');
  }
  L.push('', '    object Radius {');
  for (const [k, v] of Object.entries(t.radius)) L.push(`        const val ${camel(k)}: Int = ${v}`);
  L.push('    }', '', '    object Space {');
  for (const [k, v] of Object.entries(t.space)) L.push(`        const val s${k}: Int = ${v}`);
  L.push('    }', '', '    object Size {');
  for (const [k, v] of Object.entries(t.size)) L.push(`        const val ${camel(k)}: Int = ${v}`);
  L.push('    }', '}', '');
  return L.join('\n');
}
