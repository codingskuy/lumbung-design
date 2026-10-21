# Struk Fee (thermal 80 mm)

Tiket LMB-DSG-003. Dicetak dari layar Timbang Lot (lihat [layar gudang](./gudang-desktop.md)) setelah berat bersih tersimpan.

## Bidang wajib

Nama gudang, Id lot, Berat, Fee, Total, Waktu cetak (acceptance LMB-DSG-003, ADR-0001 butir 4). Tambahan yang dipakai di desain: komoditas/grade, zona dan tarif per kg (agar petani/pembeli bisa memeriksa fee), status cetak. Bidang tambahan menunggu konfirmasi FRD (asumsi); enam bidang wajib tidak boleh hilang.

## Spesifikasi

- Kertas thermal 80 mm; font mono `type.struk` (12/16), lebar karakter 48 kolom (Font A, 203 dpi, area cetak sekitar 72 mm). Seluruh baris <= 48 kolom (diuji otomatis).
- Satu kolom, rata kiri-kanan dengan spasi; garis pemisah `-` dan `=`; tanpa warna, tanpa ikon gambar (hitam putih thermal).
- Uang: bilangan bulat rupiah dengan titik ribuan ("Rp1.500"); berat: gram bilangan bulat dengan titik ribuan dan satuan "g" (tanpa desimal). Desain tidak menghitung fee atau total; keduanya datang dari sistem.
- Cetak ganda dicegah: struk membawa penanda "CETAK ULANG" bila status cetak sudah tercatat; status cetak disimpan ke sistem.
- Offline: waktu cetak memakai jam perangkat; id lot boleh bernomor sementara `TMP-xxxxxxxx` (FSD/10).
- Contoh di bawah ilustratif: tarif zona Dekat Rp1.500/kg dari BRD/30 BR-301; nama gudang, id lot, berat dan waktu adalah isian contoh, bukan data nyata.

## Contoh (zona Dekat)

```struk
       [NAMA GUDANG LUMBUNG]
          STRUK FEE LOGISTIK
================================================
Id lot        : L-8812
Komoditas     : Cabai rawit merah, Grade A
Zona          : Dekat (< 15 km)
------------------------------------------------
Berat         : 100.000 g
Tarif fee     : Rp1.500 / kg
Fee           : Rp150.000
================================================
Total         : Rp150.000
================================================
Waktu cetak   : 2026-10-24 06.12
Petugas       : (nama petugas)
Status        : CETAK PERTAMA
------------------------------------------------
Fee logistik murni, dibayar pembeli,
tidak dipotong dari petani.
```

## Varian

- Zona Jauh (15-25 km): baris Zona dan Tarif berubah ke "Jauh (15-25 km)" dan "Rp2.500 / kg"; selain itu identik.
- Cetak ulang: baris Status menjadi "CETAK ULANG (ke-N)" dan teks "SALINAN" di judul.

## Catatan konsistensi dokumen

Draf lama `screens/README.md` menyebut thermal 58 mm dan struk berisi berat kebun, berat gudang, dan susut. ADR-0001 dan acceptance tiket menetapkan 80 mm; berat kebun/susut tidak masuk daftar bidang wajib sehingga tidak dimuat di struk ini (tersedia di layar Timbang Lot). Konfirmasi ke FRD bila susut perlu tercetak.
