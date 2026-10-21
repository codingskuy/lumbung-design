# Papan Harga (web publik dan cetakan A3)

Tiket LMB-DSG-004. Sumber: `keuangan/20-papan-harga-mingguan.md` (TownHall), BRD/30 BR-305 dan BR-306, FSD/10 (web publik tanpa login; web tidak menghitung ulang fee atau grade). Konsumen: `lumbung-web` (Svelte) dan cetakan A3 pintu gudang. Token: [`tokens/`](../tokens/README.md).

Tiga jalur publikasi serentak maksimal Jumat 17.00: halaman web, cetakan A3, siaran grup petani. Desain ini mencakup dua jalur pertama; siaran pesan di luar cakupan desain.

## Isi wajib (BR-306)

- 3 komoditas pilot: Cabai rawit merah, Bawang merah, Kangkung.
- Harga per kg Grade A dan Grade B tiap komoditas (6 angka). Grade C tidak ditampilkan di papan.
- Fee logistik terpisah di bawah papan, dua zona: Zona Dekat (< 15 km) Rp1.500/kg dan Zona Jauh (15-25 km) Rp2.500/kg, dengan teks bahwa fee bukan bagian harga papan (agar tidak tercampur).
- Tanggal berlaku: "Berlaku Senin-Minggu, (tanggal mulai) - (tanggal akhir)", plus waktu publikasi.
- Angka dari sistem; desain tidak menghitung median, buffer, atau pembulatan.

Data contoh di dokumen ini dan di `papan-harga-a3.svg` adalah contoh papan 6-12 Oktober 2026 (BRD/30 BR-305), bukan harga berlaku:

| Komoditas | Grade A | Grade B |
|---|---|---|
| Cabai rawit merah | Rp31.500/kg | Rp26.500/kg |
| Bawang merah | Rp28.000/kg | Rp23.500/kg |
| Kangkung | Rp6.000/kg | Rp5.000/kg |

Fee logistik: Zona Dekat Rp1.500/kg, Zona Jauh Rp2.500/kg.

## Web publik

Halaman tanpa login, responsif (mulai 320 px), ringan (jaringan lambat) dan terbaca di layar ponsel dan layar gudang.

```
+------------------------------------------------------+
| LUMBUNG   Papan Harga                                |
| Berlaku Senin-Minggu, (tgl) - (tgl)                  |
| Diterbitkan Jumat (tgl) 17.00                        |
+------------------------------------------------------+
| Komoditas            Grade A         Grade B         |
| Cabai rawit merah    Rp31.500/kg     Rp26.500/kg     |
| Bawang merah         Rp28.000/kg     Rp23.500/kg     |
| Kangkung             Rp6.000/kg      Rp5.000/kg      |
+------------------------------------------------------+
| Fee logistik (terpisah dari harga papan)             |
| Zona Dekat (< 15 km)  Rp1.500/kg                     |
| Zona Jauh (15-25 km)  Rp2.500/kg                     |
+------------------------------------------------------+
| Cara harga ditetapkan (ringkas) | Unduh cetakan A3   |
+------------------------------------------------------+
```

- Latar `color.putih-kapas`; kartu `color.putih`, `radius.kartu`; judul `type.judul-besar`; angka harga `type.angka-timbang` pada layar >= 768 px dan `type.judul` di bawahnya (angka tabular); label `type.label`; teks sekunder `color.abu-karung`.
- Kepala tabel `color.hijau-daun` teks `color.putih`; baris selang-seling `color.putih` dan `color.putih-kapas`; garis `color.abu-garis`.
- Blok fee di kartu terpisah dengan garis `color.kuning-panen` agar jelas bukan bagian harga papan.
- Layar sempit: tabel menjadi kartu per komoditas (A dan B bersisian).
- Keadaan: papan belum terbit minggu ini menampilkan papan sebelumnya dengan label `color.oranye-offline` "Papan minggu lalu, papan baru terbit Jumat 17.00"; lewat 17.00 tanpa papan baru = insiden SLA (dokumen keuangan), bukan urusan desain.
- Aksesibilitas: tabel semantik (`th`/`scope`), kontras uji `tokens/`, tanpa bergantung pada warna.

## Cetakan A3 pintu gudang

[`papan-harga-a3.svg`](./papan-harga-a3.svg): A3 potret 297 x 420 mm (viewBox 2970 x 4200 = 0,1 mm per satuan), hanya warna dari token (diuji), font sistem tanpa unduhan.

- Terbaca dari 3 m: angka harga setinggi sekitar 19 mm (tinggi huruf ~ 190 satuan), nama komoditas ~ 13 mm.
- Cetak hitam putih tetap terbaca: grade dibedakan huruf besar A/B, bukan warna.
- Margin 15 mm; tanggal berlaku di kepala dan di kaki; ruang kosong kecil di kaki untuk paraf Admin Gudang dan jam tempel.
- Pembuatan: isi diganti per minggu (6 angka, 2 fee, tanggal) dari data sistem; satu template.

## Asumsi

- Nama komoditas lengkap ("Cabai rawit merah", "Bawang merah") diambil dari contoh dokumen keuangan; KONTEKS §4 menetapkan 3 komoditas pilot.
- Tautan "Cara harga ditetapkan" meringkas aturan dokumen keuangan; teks final menunggu FRD/PRD papan.
