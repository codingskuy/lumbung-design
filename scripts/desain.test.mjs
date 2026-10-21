// Uji kelengkapan artefak desain: node --test scripts/desain.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, loadTokens } from './lib.mjs';

const baca = (p) => readFileSync(join(ROOT, p), 'utf8');
const t = loadTokens();

test('flow gudang memuat 7 langkah FSD/PRD berurutan dan batas muat 30 menit', () => {
  const f = baca('flows/gudang-timbang-sampai-surat-jalan.md');
  const langkah = ['Terima lot', 'Timbang kotor', 'Sortir A/B/C', 'Timbang bersih', 'Cetak label', 'Susun trip', 'Cetak surat jalan'];
  let pos = -1;
  for (const l of langkah) {
    const i = f.indexOf(l, pos + 1);
    assert.ok(i > pos, `langkah hilang/urutan salah: ${l}`);
    pos = i;
  }
  assert.match(f, /30 menit/);
  assert.match(f, /Offline/);
});

test('7 layar gudang desktop ada dengan bilah Online/Offline + antrean', () => {
  const s = baca('screens/gudang-desktop.md');
  for (const n of ['Dasbor Hari Ini', 'Timbang Lot', 'Hasil Sortir', 'Cetak Label', 'Susun Trip', 'Cetak Surat Jalan', 'Arsip Kontrak'])
    assert.ok(new RegExp(`^## \\d\\. ${n}$`, 'm').test(s), `layar hilang: ${n}`);
  assert.equal((s.match(/^## \d\. /gm) || []).length, 7);
  assert.equal((s.match(/Online\/Offline/g) || []).length >= 1, true);
  assert.match(s, /antrean/i);
  assert.match(s, /Windows/);
});

test('struk fee memuat 6 bidang wajib dan lebar <= 48 kolom (thermal 80 mm)', () => {
  const s = baca('screens/struk-fee.md');
  for (const b of ['Nama gudang', 'Id lot', 'Berat', 'Fee', 'Total', 'Waktu cetak']) assert.ok(s.includes(b), `bidang hilang: ${b}`);
  const blok = s.match(/```struk\n([\s\S]*?)```/);
  assert.ok(blok, 'blok ```struk tidak ada');
  for (const baris of blok[1].split('\n')) assert.ok([...baris].length <= 48, `baris > 48 kolom: "${baris}"`);
  assert.match(s, /80 mm/);
});

test('token yang dirujuk layar ada di sumber token', () => {
  for (const f of ['screens/gudang-desktop.md', 'screens/struk-fee.md']) {
    for (const m of baca(f).matchAll(/`(color|type|radius|space|size)\.([a-z0-9-]+)`/g))
      assert.ok(t[m[1]][m[2]] !== undefined, `${f}: token tidak ada ${m[1]}.${m[2]}`);
  }
});

test('README desain mendaftar Figma (tautan atau penanda menyusul)', () => {
  assert.match(baca('README.md'), /Figma/);
});
