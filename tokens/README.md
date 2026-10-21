# Token Desain Lumbung

Sumber tunggal: [`lumbung.tokens.json`](./lumbung.tokens.json). Keluaran build (jangan diedit tangan):

- `build/lumbung.css` — CSS variables `--lumbung-*` untuk `lumbung-web` (Svelte): `@import` atau salin ke `app.css`.
- `build/LumbungTokens.kt` — konstanta Kotlin polos (tanpa dependensi Compose) untuk `lumbung-app-kmp`; warna ARGB `Long`, ukuran angka dp/sp.

```bash
node scripts/build-tokens.mjs        # bangun ulang keluaran
node --test scripts/tokens.test.mjs  # uji: kontras, nilai awal, sinkron build, pencatatan README
```

Aturan: ubah JSON, jalankan build, catat di bagian Riwayat di bawah. Uji gagal bila token tidak tercatat di berkas ini atau berkas build tidak sinkron.

Tema tunggal terang. Layar gudang dipakai di cahaya terang, jadi mode gelap tidak termasuk v1.0.0.

## Warna

Nama lama dipertahankan (`--lumbung-<nama>`); nilai awal tidak berubah.

| Token | Nilai | Peran |
|---|---|---|
| `hijau-daun` | `#2E7D32` | aksi utama gudang; status Online |
| `hijau-daun-tua` | `#1B5E20` | aksi utama saat ditekan/fokus |
| `kuning-panen` | `#F9A825` | sorotan lot aktif (teks di atasnya selalu `tinta`) |
| `kuning-panen-muda` | `#FFF8E1` | latar baris/kartu lot aktif |
| `abu-karung` | `#616161` | teks sekunder |
| `abu-garis` | `#757575` | garis kontrol dan input (kontras bukan teks >= 3:1) |
| `merah-susut` | `#C62828` | peringatan susut berlebih, galat |
| `merah-susut-muda` | `#FFEBEE` | latar peringatan |
| `oranye-offline` | `#BF360C` | bilah status Offline dan antrean tertahan |
| `biru-info` | `#1565C0` | info, tautan, status sinkron berjalan |
| `putih-kapas` | `#FAFAFA` | latar utama |
| `putih` | `#FFFFFF` | latar kartu, teks di atas warna pekat |
| `tinta` | `#212121` | teks isi |

Status tidak boleh hanya warna: selalu sertakan ikon atau teks (Online/Offline, A/B/C).

### Catatan kontras untuk kondisi gudang

Cahaya terang menurunkan kontras efektif layar dan sarung tangan menurunkan ketepatan sentuh. Karena itu: teks isi dan teks di atas sorotan memakai target 7:1 (AAA), teks lain minimum 4.5:1 (AA), elemen non-teks minimum 3:1. Rasio dihitung rumus WCAG 2.x dan diuji otomatis.

| Teks / elemen | Latar | Rasio | Minimum | Untuk |
|---|---|---|---|---|
| `tinta` | `putih-kapas` | 15.43:1 | 7:1 | teks isi (cahaya terang) |
| `tinta` | `putih` | 16.10:1 | 7:1 | teks di kartu |
| `putih` | `hijau-daun` | 5.13:1 | 4.5:1 | teks tombol aksi utama |
| `putih` | `hijau-daun-tua` | 7.87:1 | 7:1 | tombol aksi utama ditekan |
| `tinta` | `kuning-panen` | 8.17:1 | 7:1 | teks pada sorotan lot aktif |
| `tinta` | `kuning-panen-muda` | 15.16:1 | 7:1 | teks pada latar lot aktif |
| `abu-karung` | `putih-kapas` | 5.93:1 | 4.5:1 | teks sekunder |
| `putih` | `merah-susut` | 5.62:1 | 4.5:1 | teks pada peringatan susut |
| `merah-susut` | `merah-susut-muda` | 4.92:1 | 4.5:1 | teks peringatan di latar muda |
| `putih` | `oranye-offline` | 5.60:1 | 4.5:1 | bilah Offline |
| `putih` | `biru-info` | 5.75:1 | 4.5:1 | info/tautan |
| `abu-garis` | `putih-kapas` | 4.41:1 | 3:1 | garis kontrol/input (bukan teks, WCAG 1.4.11) |
| `hijau-daun` | `putih-kapas` | 4.91:1 | 3:1 | ikon/garis hijau (bukan teks) |

## Tipografi

Tanpa font eksternal (berkas lokal/offline, tanpa unduhan): keluarga sistem `sans` dan `mono`. Satuan px di web, sp di Compose.

| Token | Ukuran/baris | Bobot | Keluarga | Pakai untuk |
|---|---|---|---|---|
| `angka-timbang` | 56/64 | 700 | mono, tabular | angka timbangan kotor/bersih (terbaca dari jauh) |
| `judul-besar` | 28/36 | 700 | sans | judul layar lapangan |
| `judul` | 20/28 | 700 | sans | judul bagian (nilai awal dipertahankan) |
| `isi-besar` | 18/26 | 400 | sans | isi layar sopir/petani (layar kecil, bergerak) |
| `isi` | 14/20 | 400 | sans | isi desktop (nilai awal dipertahankan) |
| `label` | 12/16 | 600 | sans | label kolom, chip |
| `struk` | 12/16 | 400 | mono | struk thermal (nilai awal dipertahankan) |

## Radius

| Token | Nilai (px/dp) |
|---|---|
| `tombol` | 8 |
| `input` | 8 |
| `kartu` | 12 |
| `chip` | 999 |

## Spasi

Skala 4-pt: `1`=4, `2`=8, `3`=12, `4`=16, `5`=24, `6`=32, `7`=48 (`--lumbung-space-N`; nama `space.N`).

## Ukuran sentuh dan fokus

| Token | Nilai | Catatan |
|---|---|---|
| `target-min` | 48 | minimum semua kontrol sentuh |
| `target-sarung` | 56 | aksi utama di gudang/lapangan (sarung tangan) |
| `garis-fokus` | 3 | tebal cincin fokus keyboard (desktop) |

## Riwayat perubahan token

### 1.0.0 (LMB-DSG-002)

- Dipertahankan tanpa perubahan nilai: `hijau-daun`, `kuning-panen`, `abu-karung`, `merah-susut`, `putih-kapas`; radius kartu 12, tombol 8; spasi 4/8/12/16/24; tipografi judul 20/28 tebal, isi 14/20, struk mono 12.
- Ditambahkan warna: `hijau-daun-tua`, `kuning-panen-muda`, `abu-garis`, `merah-susut-muda`, `oranye-offline`, `biru-info`, `putih`, `tinta`.
- Ditambahkan tipografi: `angka-timbang`, `judul-besar`, `isi-besar`, `label`; nama lama "Judul/Isi/Struk" menjadi `judul`/`isi`/`struk`.
- Ditambahkan radius `input`, `chip`; spasi `6`=32, `7`=48; ukuran `target-min`, `target-sarung`, `garis-fokus`.
- Ditambahkan pipeline `scripts/` (build CSS + Kotlin, uji kontras).

## Figma

Link Figma token: belum ada (berkas Figma resmi belum dibuat); lihat `README.md` repo.
