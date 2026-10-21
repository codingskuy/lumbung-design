# lumbung-design

Desain produk Lumbung: token, alur gudang, dan struk fee.

## Sumber desain

- Alat desain: pencil.app (dipakai di laptop pemilik desain), bukan Figma. Berkas desain disimpan di repo ini hanya bila formatnya berkas teks; format berkas pencil.app belum dikonfirmasi (lihat pertanyaan di PR #5).
- Sumber kebenaran yang dapat ditinjau di repo: `tokens/` (JSON), `flows/` dan `screens/` (Markdown + wireframe ASCII), `screens/papan-harga-a3.svg`.

## Isi

- `tokens/` — token desain (warna, tipografi, radius, spasi); sumber JSON + keluaran `build/lumbung.css` dan `build/LumbungTokens.kt`.
- `scripts/` — pembangun dan uji token (`node scripts/build-tokens.mjs`, `node --test scripts/tokens.test.mjs`).
- `flows/` — alur gudang: terima lot, timbang kotor, sortir, timbang bersih, label, susun trip, surat jalan.
- `screens/` — layar gudang desktop, struk fee, mobile sopir/petani, papan harga web dan template A3.

## Prinsip

- Utamakan keterbacaan di gudang (cahaya terang, sarung tangan, layar kecil).
- Struk fee wajib memuat: nama gudang, id lot, berat, fee, total, dan waktu cetak.
- Setiap perubahan token wajib dicatat di `tokens/README.md`.

## Keterkaitan

- Aplikasi: [lumbung-app-kmp](https://github.com/Coding-Skuy/lumbung-app-kmp)
- Web: [lumbung-web](https://github.com/Coding-Skuy/lumbung-web)
