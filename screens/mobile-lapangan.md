# Layar Mobile Lapangan (sopir dan petani)

Tiket LMB-DSG-004. Sumber: FSD/10-alur (urutan layar sopir dan petani, GPS, offline), PRD/10-pengguna (kebutuhan dan hak akses), BRD/30 BR-306 (papan harga). Konsumen: `lumbung-app-kmp` (Compose Multiplatform, Android). Token: [`tokens/`](../tokens/README.md).

## Kerangka bersama

- Potret, lebar acuan 360 dp, aman sampai 320 dp. Satu tangan, sering bergerak, sering memakai sarung tangan, matahari langsung.
- Latar `color.putih-kapas`, kartu `color.putih` dengan `radius.kartu`, teks isi `type.isi-besar` (18/26), judul `type.judul-besar`, label `type.label`. Jarak `space.4` tepi layar, `space.3` antarkartu.
- Aksi utama: tombol lebar penuh, tinggi `size.target-sarung`, `color.hijau-daun` teks `color.putih`, `radius.tombol`, di dasar layar (zona jempol). Semua kontrol lain >= `size.target-min`.
- **Bilah status lapangan (SEMUA layar, di bawah judul)**: pil Online ("Online", `color.hijau-daun`) atau Offline ("Offline", `color.oranye-offline` teks `color.putih`), disertai "Antrean: N" dan, saat menyinkron, "Menyinkron..." `color.biru-info`. Selalu ikon + teks, tidak hanya warna. Offline bukan galat: aksi simpan tetap berhasil lokal dahulu (FSD/10), toast "Tersimpan, menunggu sinkron".
- Mode offline penuh untuk sopir; sinkron maksimal 2 jam setelah sinyal kembali (PRD/10). Foto bukti menyusul bila antrean besar (FSD/10).
- Navigasi bawah (3 tab maksimal) untuk layar utama; layar rinci memakai tombol kembali di kiri atas.

```
+--------------------------------+
| Judul layar                    |
| [Offline]  Antrean: 3          |   <- bilah status (semua layar)
+--------------------------------+
|                                |
|          isi layar             |
|                                |
| +----------------------------+ |
| |        AKSI UTAMA          | |   <- tinggi 56
| +----------------------------+ |
|  Trip      Titik      Lainnya  |
+--------------------------------+
```

## Sopir

Sopir hanya melihat tripnya hari itu (PRD/10). GPS dicatat tiap 5 menit hanya selama trip aktif (FSD/10); indikator "GPS aktif" tampil hanya pada trip berjalan.

### 1. Trip Hari Ini

Tujuan: daftar titik berurutan trip hari ini dan mulai trip.

```
+--------------------------------+
| Trip Hari Ini                  |
| [Offline]  Antrean: 3          |
| T-xxx  Rute Utara  berangkat   |
| 06.30                          |
| 1. Titik A  xx g  [menunggu]  |
| 2. Titik B  xx g  [menunggu]  |
| 3. Titik C  xx g  [menunggu]  |
| [      Mulai Trip       ]      |
+--------------------------------+
```

- Komponen: kartu ringkasan trip, daftar titik berurutan dengan status (menunggu/tiba/selesai, teks + ikon), tombol Mulai Trip.
- Keadaan: tidak ada trip "Tidak ada trip hari ini"; Offline: data trip dari sinkron terakhir dengan stempel waktu; trip berjalan menampilkan "GPS aktif" dan tombol berubah ke "Lanjut ke Titik Aktif".

### 2. Titik Aktif

Tujuan: titik tujuan saat ini; catat tiba dan berangkat per titik.

```
+--------------------------------+
| Titik B  (2 dari 3)            |
| [Offline]  Antrean: 3          |
| Pembeli: (nama)  Alamat: ...   |
| Muatan: cabai A xx g ...      |
| Tiba: --:--   Berangkat: --:-- |
| [Buka Navigasi]                |
| [       Catat Tiba      ]      |
+--------------------------------+
```

- Aksi utama berubah menurut tahap: Catat Tiba, lalu Catat Bukti Terima (ke layar 3), lalu Catat Berangkat.
- Navigasi memakai aplikasi peta bawaan perangkat; tidak membutuhkan sinyal untuk mencatat.
- Keadaan Offline: waktu tiba/berangkat memakai jam perangkat dan masuk antrean.

### 3. Bukti Terima

Tujuan: foto keranjang dan tanda tangan penerima (PRD/20 langkah 4).

```
+--------------------------------+
| Bukti Terima  Titik B          |
| [Offline]  Antrean: 3          |
| Foto keranjang   [ + Foto ]    |
|  [thumb] [thumb]               |
| Tanda tangan penerima          |
| +----------------------------+ |
| |      (area tanda tangan)   | |
| +----------------------------+ |
| Nama penerima [_____________]  |
| [   Simpan Bukti Terima   ]    |
+--------------------------------+
```

- Komponen: pengambil foto (>= 1 foto), kanvas tanda tangan, nama penerima, ulangi tanda tangan.
- Aksi utama: Simpan Bukti Terima. Offline: teks bantu "Foto menyusul saat tersambung WiFi bila antrean besar" (FSD/10), bukti teks dan tanda tangan tersimpan lokal.
- Konflik: lapangan menang untuk bukti terima (FSD/10); tidak ada pemberitahuan untuk sopir kecuali kalah pada data timbang (gudang menang).

### 4. Insiden

Tujuan: laporkan insiden selama trip (PRD/10).

```
+--------------------------------+
| Lapor Insiden                  |
| [Offline]  Antrean: 3          |
| Jenis  ( ) Kendaraan  ( ) Titik |
|        ( ) Muatan     ( ) Lain  |
| Keterangan [________________]  |
| Foto (opsional)  [ + Foto ]    |
| [      Kirim Laporan      ]    |
+--------------------------------+
```

- Komponen: pilihan jenis (radio besar), keterangan, foto opsional. Daftar jenis di sini usulan desain (asumsi; FRD belum merinci).
- Aksi utama: Kirim Laporan; Offline masuk antrean dengan nomor antrean terlihat.

## Petani

Petani hanya melihat kontrak, rencana setoran, pembayaran, dan papan harganya sendiri (PRD/10). Petani tidak dapat mengubah harga (FSD/10): semua angka harga pada layar ini baca-saja, tanpa kolom isian harga.

### 5. Kontrak Saya

Tujuan: kontrak mini musim aktif (90 hari).

```
+--------------------------------+
| Kontrak Saya                   |
| [Offline]  Antrean: 0          |
| Kontrak K-xxx   [Aktif]        |
| Komoditas: cabai, bawang       |
| Mulai: tgl   Berakhir: tgl     |
| Acuan harga: Papan Harga ->    |
| [  Lihat Rencana Setoran  ]    |
+--------------------------------+
```

- Komponen: kartu kontrak (status teks + ikon), rincian baca-saja, tautan ke Papan Harga.
- Offline: tampil data sinkron terakhir dengan stempel "Per: (waktu)".

### 6. Rencana Setoran

Tujuan: jadwal dan perkiraan volume setor.

```
+--------------------------------+
| Rencana Setoran                |
| [Offline]  Antrean: 1          |
| Sen 26/10  cabai  ~xx g [ubah]|
| Kam 29/10  bawang ~xx g [ubah]|
| [   Tambah Rencana Setoran  ]  |
+--------------------------------+
```

- Petani boleh mengubah rencana setoran sendiri (volume dan tanggal), bukan harga. Perubahan masuk antrean; konflik mengikuti aturan FSD/10.
- Keadaan: kosong "Belum ada rencana setoran".
- Catatan asumsi: hak ubah rencana setoran diturunkan dari nama layar FSD/10 dan kebutuhan PRD/10 (riwayat setoran); FRD diminta mengonfirmasi.

### 7. Pembayaran Saya

Tujuan: status dan riwayat pembayaran petani (H+1 dari berat bersih per grade x harga papan; maksimal 16.00, PRD/20).

```
+--------------------------------+
| Pembayaran Saya                |
| [Offline]  Antrean: 0          |
| Setoran 24/10   [DIBAYAR]      |
|  Cabai A  xx g  Rp x          |
|  Cabai B  xx g  Rp x          |
|  Total diterima  Rp x          |
| Setoran 26/10   [TERLAMBAT]    |
+--------------------------------+
```

- Berat gram bilangan bulat di semua layar mobile.
- Komponen: daftar pembayaran per setoran dengan rincian per grade (berat, harga papan, subtotal) dan total; status teks hanya DIBAYAR atau TERLAMBAT (keputusan pemilik produk; TERLAMBAT = lewat batas H+1 16.00 belum dibayar). TERLAMBAT memakai `color.merah-susut` + ikon, DIBAYAR memakai `color.hijau-daun` + ikon. Pertanyaan untuk manajer: apakah perlu keadaan sebelum jatuh tempo? Bila tidak, setoran yang belum jatuh tempo tidak diberi lencana.
- Semua angka dari sistem; layar tidak menghitung. Fee logistik tidak dipotong dari petani (BRD/30 BR-302) sehingga tidak muncul sebagai pengurang.

### 8. Papan Harga

Tujuan: harga papan minggu berjalan untuk petani (baca-saja).

```
+--------------------------------+
| Papan Harga                    |
| [Offline]  Antrean: 0          |
| Berlaku: Senin-Minggu (tgl)    |
| Cabai rawit merah              |
|   Grade A  Rp31.500 /kg        |
|   Grade B  Rp26.500 /kg        |
| Bawang merah   A Rp28.000 ...  |
| Kangkung       A Rp6.000  ...  |
| Fee logistik (terpisah):       |
|  Zona Dekat Rp1.500 | Jauh Rp2.500 |
+--------------------------------+
```

- Isi sama dengan papan web ([`papan-harga.md`](./papan-harga.md)); angka dari sistem. Contoh angka pada ilustrasi di dokumen ini dan papan adalah contoh papan 6-12 Oktober 2026 dari BRD/30 BR-305, bukan harga berlaku.
- Offline: papan tersimpan terakhir ditampilkan dengan stempel "Berlaku sampai (tanggal)"; bila lewat masa berlaku muncul peringatan `color.oranye-offline` "Mungkin sudah diganti, sambungkan untuk memperbarui".

## Kepatuhan

- Kontras seluruh pasangan warna ada di uji `tokens/`; status tidak hanya warna.
- Target sentuh: aksi utama 56 dp, lainnya >= 48 dp.
- Wireframe ASCII adalah spesifikasi tata letak untuk ditinjau di PR; desain dibuat dengan pencil.app (lihat README).
- Isi kolom adalah usulan desain; FRD/FSD Lumbung v1.0.0 hanya menetapkan nama dan urutan layar, jadi asumsi ditandai di atas.
