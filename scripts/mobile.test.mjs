// Uji layar mobile dan papan harga: node --test scripts/mobile.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, loadTokens } from './lib.mjs';

const baca = (p) => readFileSync(join(ROOT, p), 'utf8');
const t = loadTokens();
const hex = new Set(Object.values(t.color).map((v) => v.toUpperCase()));

test('layar mobile: sopir 4 + petani 4, tiap layar memuat status offline/antrean', () => {
  const s = baca('screens/mobile-lapangan.md');
  for (const n of ['Trip Hari Ini', 'Titik Aktif', 'Bukti Terima', 'Insiden', 'Kontrak Saya', 'Rencana Setoran', 'Pembayaran Saya', 'Papan Harga'])
    assert.ok(new RegExp(`^### \\d\\. ${n}$`, 'm').test(s), `layar hilang: ${n}`);
  const bagian = s.split(/^### \d\. /m).slice(1);
  assert.equal(bagian.length, 8);
  for (const b of bagian) assert.match(b, /Offline/, `bagian tanpa Offline: ${b.slice(0, 30)}`);
  assert.match(s, /antrean/i);
  assert.match(s, /GPS.*5 menit/);
  assert.match(s, /tidak (dapat|bisa) mengubah harga/i);
});

test('papan harga web: 3 komoditas x grade A/B + fee 2 zona + tanggal berlaku', () => {
  const s = baca('screens/papan-harga.md');
  for (const x of ['Cabai', 'Bawang', 'Kangkung', 'Grade A', 'Grade B', 'Rp1.500', 'Rp2.500', 'Berlaku', 'Zona Dekat', 'Zona Jauh']) assert.ok(s.includes(x), `hilang: ${x}`);
});

test('template A3 SVG: ukuran A3, 6 harga, fee 2 zona, tanggal, hanya warna token', () => {
  const svg = baca('screens/papan-harga-a3.svg');
  assert.match(svg, /viewBox="0 0 2970 4200"/);
  assert.match(svg, /width="297mm"/);
  assert.match(svg, /height="420mm"/);
  for (const x of ['31.500', '26.500', '28.000', '23.500', '6.000', '5.000', '1.500', '2.500', 'Berlaku']) assert.ok(svg.includes(x), `hilang di SVG: ${x}`);
  for (const m of svg.matchAll(/#[0-9A-Fa-f]{6}\b/g)) assert.ok(hex.has(m[0].toUpperCase()), `warna di luar token: ${m[0]}`);
  assert.equal((svg.match(/<svg/g) || []).length, 1);
  assert.equal((svg.match(/<\/svg>/g) || []).length, 1);
});

test('token yang dirujuk ada', () => {
  for (const f of ['screens/mobile-lapangan.md', 'screens/papan-harga.md'])
    for (const m of baca(f).matchAll(/`(color|type|radius|space|size)\.([a-z0-9-]+)`/g))
      assert.ok(t[m[1]][m[2]] !== undefined, `${f}: token tidak ada ${m[1]}.${m[2]}`);
});
