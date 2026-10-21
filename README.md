# lumbung-design

Desain produk Lumbung: token, alur gudang, dan struk fee.

## Figma

- Berkas Figma: [Lumbung — berkas desain (tautan menyusul)](https://www.figma.com/) — tautan masih kosong, akan diisi alamat berkas Figma resmi saat tersedia.

## Isi

- `tokens/` — token desain (warna, tipografi, radius, spasi); sumber JSON + keluaran `build/lumbung.css` dan `build/LumbungTokens.kt`.
- `scripts/` — pembangun dan uji token (`node scripts/build-tokens.mjs`, `node --test scripts/tokens.test.mjs`).
- `flows/` — alur gudang: terima lot, timbang, hitung fee, cetak struk.
- `screens/` — daftar layar aplikasi dan web ops.

## Prinsip

- Utamakan keterbacaan di gudang (cahaya terang, sarung tangan, layar kecil).
- Struk fee wajib memuat: nama gudang, id lot, berat, fee, total, dan waktu cetak.
- Setiap perubahan token wajib dicatat di `tokens/README.md`.

## Keterkaitan

- Aplikasi: [lumbung-app-kmp](https://github.com/Coding-Skuy/lumbung-app-kmp)
- Web: [lumbung-web](https://github.com/Coding-Skuy/lumbung-web)
