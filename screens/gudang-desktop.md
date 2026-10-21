# Layar Gudang Desktop (Windows)

Tiket LMB-DSG-003. Tujuh layar urutan FSD/10-alur untuk aplikasi gudang (`lumbung-app-kmp`, target desktop Windows, Compose Multiplatform). Alur: [`flows/gudang-timbang-sampai-surat-jalan.md`](../flows/gudang-timbang-sampai-surat-jalan.md). Token: [`tokens/`](../tokens/README.md).

## Hak akses

Desktop gudang dioperasikan petugas gudang untuk alur timbang sampai surat jalan. Hak admin minimum (keputusan pemilik produk): admin hanya mengubah papan harga dan tarif fee; layar di sini tidak memuat pengaturan harga atau tarif (hanya menampilkan nilai dari sistem). Penamaan peran "Admin gudang" di PRD/10 perlu diselaraskan oleh manajer.

## Kerangka bersama (semua layar)

- Jendela minimum 1280 x 720; skala tampilan Windows 100% sampai 150%. Dioperasikan dengan mouse/sentuh dan keyboard; timbangan lewat USB/serial.
- Latar `color.putih-kapas`, kartu `color.putih` dengan `radius.kartu`, teks `color.tinta`, teks sekunder `color.abu-karung`. Jarak antarkelompok `space.5`, dalam kelompok `space.3`.
- Aksi utama satu per layar: tombol `color.hijau-daun`, teks `color.putih`, tinggi `size.target-sarung`, `radius.tombol`. Ditekan: `color.hijau-daun-tua`. Fokus keyboard: cincin `size.garis-fokus` `color.biru-info`.
- Bilah atas (tinggi `size.target-min`, SELALU tampil, FSD/10): kiri nama layar dan langkah (mis. "Langkah 2 dari 7"); kanan status Online/Offline, jumlah antrean, nama petugas.

```
+----------------------------------------------------------------------------+
| Timbang Lot  (Langkah 2 dari 7)        [Online] Antrean: 0   Petugas: Rina |
+--------+-------------------------------------------------------------------+
| Dasbor |                                                                   |
| Timbang|                      area isi layar                               |
| Sortir |                                                                   |
| Label  |                                                                   |
| Trip   |                                                                   |
| S.Jalan|                                                                   |
| Arsip  |                                                                   |
+--------+-------------------------------------------------------------------+
```

- Status Online/Offline: Online = ikon titik + teks "Online" di `color.hijau-daun`; Offline = ikon + teks "Offline" pada pil `color.oranye-offline` teks `color.putih`; angka antrean `type.isi-besar`, dengan teks "Antrean: N". Antrean > 0 saat Online menampilkan "Menyinkron..." `color.biru-info`.
- Bilah samping 7 item mengikuti urutan FSD/10, aktif ditandai `color.kuning-panen-muda` + garis kiri `color.kuning-panen` (bukan warna saja: teks tebal `type.label`).
- Semua simpan langsung berhasil (tulis lokal dahulu); toast "Tersimpan (menunggu sinkron)" saat Offline.
- Berat selalu gram bilangan bulat (tanpa desimal, titik ribuan, satuan "g"); konversi ke kg hanya pada tarif per kg di struk. Angka berat memakai `type.angka-timbang`; teks isi `type.isi` (desktop, mouse) dengan `type.isi-besar` untuk nilai utama.

## 1. Dasbor Hari Ini

Tujuan: ringkasan kerja hari ini dan pintu masuk ke langkah berikutnya (PRD/10 admin gudang: dasbor hari ini, stok lot per grade, antrean sinkron).

```
+----------------------------------------------------------------------------+
| Dasbor Hari Ini                        [Online] Antrean: 0   Petugas: Rina |
+--------+-------------------------------------------------------------------+
|        | Trip masuk hari ini                                [Terima Lot]   |
|  ...   | +--------+-----------+----------+-----------+---------+          |
|        | | Trip   | Petani    | Komoditas| Lot       | Status  |          |
|        | | T-xxx  | (nama)    | cabai    | L-xxxx    | menunggu|          |
|        | +--------+-----------+----------+-----------+---------+          |
|        | Stok lot per grade        Antrean sinkron        Susut hari ini    |
|        | [ A xxxxxx g ][ B xxxxxx g ][ C xxxxxx g ]   N rekaman   x,x %          |
+--------+-------------------------------------------------------------------+
```

- Komponen: tabel trip masuk (baris aktif `color.kuning-panen-muda`), tiga kartu stok per grade A/B/C, kartu antrean sinkron, kartu susut hari ini.
- Aksi utama: Terima Lot (membuka langkah 1 pada baris terpilih).
- Keadaan: kosong "Belum ada trip masuk hari ini"; Offline: kartu antrean memakai `color.oranye-offline`.
- Catatan: angka (stok, susut) datang dari sistem; titik impas dan target dari dokumen hanya sebagai konteks, tidak dihitung di layar.

## 2. Timbang Lot

Tujuan: timbang kotor (langkah 2) dan timbang bersih (langkah 4); mode ditentukan oleh tahap lot.

```
+----------------------------------------------------------------------------+
| Timbang Lot  (Langkah 2 dari 7)        [Online] Antrean: 0   Petugas: Rina |
+--------+-------------------------------------------------------------------+
|        | Lot: L-xxxx   cabai   asal: kebun (nama)      Tahap: KOTOR        |
|        |                                                                   |
|        |            +-----------------------------+                        |
|        |            |        12 345  g            |  angka timbang besar   |
|        |            +-----------------------------+  Timbangan: tersambung |
|        |  Berat kebun: x g     Selisih: x g (x,x %)                        |
|        |                                                                   |
|        |  [Ketik Manual]              [ Simpan Berat Kotor ]               |
+--------+-------------------------------------------------------------------+
```

- Komponen: angka timbang `type.angka-timbang` di kotak `color.putih` garis `color.abu-garis`; status timbangan (tersambung/putus) dengan ikon + teks; bidang id lot dengan fokus otomatis (pindai/ketik); selisih kebun-gudang tampil sebagai informasi (bukan kontrak formula).
- Aksi utama: Simpan Berat Kotor / Simpan Berat Bersih (satu tombol, label ikut tahap). Setelah simpan: lanjut otomatis ke Hasil Sortir (kotor) atau Cetak Label (bersih). Struk fee dicetak dari sini setelah berat bersih (tombol sekunder "Cetak Struk Fee", lihat [struk](./struk-fee.md)).
- Keadaan galat: timbangan putus (banner `color.merah-susut-muda`, teks `color.merah-susut`, mode ketik manual dengan konfirmasi dua kali); id lot tidak dikenal (pesan di bawah kolom).
- Pintasan: Enter = simpan, Esc = batal, F2 = ketik manual.

## 3. Hasil Sortir

Tujuan: catat berat per grade A, B, C (langkah 3).

```
+----------------------------------------------------------------------------+
| Hasil Sortir  (Langkah 3 dari 7)       [Online] Antrean: 0   Petugas: Rina |
+--------+-------------------------------------------------------------------+
|        | Lot: L-xxxx   Berat kotor: 12 345 g                               |
|        |  Grade A  [ ______ g ]   Grade B [ ______ g ]   Grade C [ ____ g ]|
|        |  Jumlah sortir: xxxxx g      Sisa belum disortir: x g             |
|        |  [Kembali]                         [ Simpan Hasil Sortir ]        |
+--------+-------------------------------------------------------------------+
```

- Komponen: tiga bidang angka besar (tinggi `size.target-sarung`, `type.isi-besar`), pil grade A/B/C dengan huruf besar; jumlah dan sisa dihitung dari masukan sebagai bantu baca, bukan aturan bisnis.
- Aksi utama: Simpan Hasil Sortir.
- Keadaan: sisa negatif menampilkan pesan `color.merah-susut` "Jumlah melebihi berat kotor".

## 4. Cetak Label

Tujuan: cetak label keranjang per grade (langkah 5).

```
+----------------------------------------------------------------------------+
| Cetak Label  (Langkah 5 dari 7)        [Online] Antrean: 0   Petugas: Rina |
+--------+-------------------------------------------------------------------+
|        | Lot: L-xxxx   Berat bersih: x g                                   |
|        |  [x] Grade A  jumlah label [ 3 ]   [ ] Grade B   [ ] Grade C      |
|        |  Pratinjau label: +--------------------+                          |
|        |                   | L-xxxx  cabai  A   |                          |
|        |                   | xxxxx g   tanggal  |                          |
|        |                   +--------------------+                          |
|        |  Printer: tersambung   Status cetak: belum                        |
|        |  [Kembali]                          [ Cetak Label ]               |
+--------+-------------------------------------------------------------------+
```

- Komponen: kotak centang per grade, pencacah jumlah label, pratinjau label, status printer dan status cetak (tersimpan untuk cegah cetak ganda).
- Aksi utama: Cetak Label. Cetak ulang meminta konfirmasi bila status "sudah tercetak".
- Isi label di pratinjau hanyalah usulan bidang (id lot, komoditas, grade, berat, tanggal); format final menunggu FRD (asumsi).

## 5. Susun Trip

Tujuan: alokasi lot ke trip dan urutan titik antar (langkah 6; PRD/20 langkah 2-3).

```
+----------------------------------------------------------------------------+
| Susun Trip  (Langkah 6 dari 7)         [Online] Antrean: 0   Petugas: Rina |
+--------+-------------------------------------------------------------------+
|        | Lot siap muat              | Trip: (pilih)  Rute: Utara  Zona: .. |
|        |  [ ] L-xxxx cabai A x g    |  1. Titik A - L-xxxx  x g            |
|        |  [ ] L-xxxx bawang A x g   |  2. Titik B - L-xxxx  x g            |
|        |            [Tambah >>]     |  [^] [v] ubah urutan   [Hapus]       |
|        |  [Kembali]                         [ Simpan Trip ]               |
+--------+-------------------------------------------------------------------+
```

- Komponen: dua kolom (lot siap muat / isi trip), tombol naik-turun urutan titik (juga seret), total berat trip.
- Aksi utama: Simpan Trip. Pengingat batas muat 30 menit dari bongkar (PRD/20) ditampilkan sebagai penghitung waktu informatif `color.biru-info`.
- Keadaan: lot tanpa grade lengkap tidak bisa ditambahkan, dengan alasan tertulis.
- Catatan: zona (Dekat < 15 km, Jauh 15-25 km) dan fee berasal dari sistem; layar menampilkan, tidak menghitung.

## 6. Cetak Surat Jalan

Tujuan: cetak surat jalan trip (langkah 7).

```
+----------------------------------------------------------------------------+
| Cetak Surat Jalan  (Langkah 7 dari 7)  [Offline] Antrean: 12  Petugas: Rina|
+--------+-------------------------------------------------------------------+
|        | Trip: T-xxx   Sopir: (nama)   Berangkat: 06.30                    |
|        | No. surat jalan: TMP-A1B2C3D4   (nomor resmi menyusul saat sinkron)|
|        |  Daftar titik dan lot: ...                                        |
|        |  Pratinjau halaman cetak                                          |
|        |  [Kembali]                      [ Cetak Surat Jalan ]             |
+--------+-------------------------------------------------------------------+
```

- Komponen: ringkasan trip, nomor surat jalan (TMP-8-karakter saat offline; SJ-YYYYMMDD-NNN resmi setelah sinkron; FSD/10), pratinjau, status cetak.
- Aksi utama: Cetak Surat Jalan. Terkunci dengan teks alasan bila Offline lebih dari 3 x 24 jam (FSD/10 butir 5); timbang dan bukti tetap bisa.
- Keadaan: Offline normal tidak menghalangi cetak; banner `color.oranye-offline` menjelaskan nomor sementara.

## 7. Arsip Kontrak

Tujuan: rujukan baca-saja kontrak mini musim petani (90 hari) saat bekerja di gudang.

```
+----------------------------------------------------------------------------+
| Arsip Kontrak                          [Online] Antrean: 0   Petugas: Rina |
+--------+-------------------------------------------------------------------+
|        | Cari petani/kontrak [____________]   Filter: aktif | selesai      |
|        | +--------------+---------+----------+----------------------+      |
|        | | Petani       | Mulai   | Berakhir | Komoditas / status   |      |
|        | +--------------+---------+----------+----------------------+      |
|        | Detail kontrak (panel kanan): komoditas, acuan harga, riwayat      |
+--------+-------------------------------------------------------------------+
```

- Komponen: pencarian, tabel, panel detail baca-saja. Tidak ada tombol ubah (petani/gudang tidak mengubah kontrak dari sini).
- Aksi utama: tidak ada (layar rujukan); aksi sekunder "Cetak Salinan".
- Keadaan: Offline tetap menampilkan data tersinkron terakhir dengan stempel "Per: (waktu sinkron)".

## Kepatuhan

- Kontras: seluruh pasangan warna di atas ada di daftar uji `tokens/` (teks isi 7:1, sisanya >= 4.5:1).
- Status tidak hanya warna: ikon + teks pada Online/Offline, grade (huruf), galat (teks).
- Target sentuh: aksi utama `size.target-sarung` (56), kontrol lain >= `size.target-min` (48).
- Wireframe ASCII adalah spesifikasi tata letak yang dapat ditinjau di PR; berkas pencil.app milik pemilik desain bukan bagian repo (lihat README).
