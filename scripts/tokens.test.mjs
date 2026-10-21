// Uji token: node --test scripts/
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, loadTokens, contrast, buildCss, buildKotlin } from './lib.mjs';

const t = loadTokens();

test('semua pasangan kontras memenuhi minimum', () => {
  for (const p of t.contrast) {
    assert.ok(t.color[p.fg] && t.color[p.bg], `warna tidak dikenal: ${p.fg}/${p.bg}`);
    const r = contrast(t.color[p.fg], t.color[p.bg]);
    assert.ok(r >= p.min, `${p.fg} di ${p.bg} = ${r.toFixed(2)} < ${p.min} (${p.untuk})`);
  }
});

test('nilai token awal tidak berubah diam-diam', () => {
  assert.equal(t.color['hijau-daun'], '#2E7D32');
  assert.equal(t.color['kuning-panen'], '#F9A825');
  assert.equal(t.color['abu-karung'], '#616161');
  assert.equal(t.color['merah-susut'], '#C62828');
  assert.equal(t.color['putih-kapas'], '#FAFAFA');
  assert.equal(t.radius.kartu, 12);
  assert.equal(t.radius.tombol, 8);
  assert.deepEqual([1, 2, 3, 4, 5].map((i) => t.space[i]), [4, 8, 12, 16, 24]);
});

test('target sentuh cukup besar untuk sarung tangan', () => {
  assert.ok(t.size['target-min'] >= 48);
  assert.ok(t.size['target-sarung'] >= 56);
});

test('berkas build sinkron dengan sumber', () => {
  assert.equal(readFileSync(join(ROOT, 'tokens/build/lumbung.css'), 'utf8'), buildCss(t));
  assert.equal(readFileSync(join(ROOT, 'tokens/build/LumbungTokens.kt'), 'utf8'), buildKotlin(t));
});

test('setiap token tercatat di tokens/README.md', () => {
  const readme = readFileSync(join(ROOT, 'tokens/README.md'), 'utf8');
  for (const g of ['color', 'radius', 'size']) for (const k of Object.keys(t[g])) assert.ok(readme.includes(k), `README tidak menyebut ${k}`);
  for (const k of Object.keys(t.type)) assert.ok(readme.includes(k), `README tidak menyebut ${k}`);
});
