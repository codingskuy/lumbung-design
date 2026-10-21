# Berkontribusi ke lumbung-design

Repo ini hanya berisi artefak desain (token, flow, layar, struk, papan harga); tanpa kode produk. Baca [AGENTS.md](./AGENTS.md) dan `docs/decisions/` dulu.

## Alur kerja

1. Fork `Coding-Skuy/lumbung-design`, clone fork, tambahkan remote `upstream`.
2. Cabang dari `upstream/main`: `feat/<kode-tiket>-<slug>`, `docs/...`, `chore/...`, `test/...`. Satu cabang = satu tiket = satu PR. Bila bergantung pada PR yang belum merge, cabang dari sana dan tulis "Bergantung pada #N" di PR.
3. Commit atomik, konvensional, berbahasa Indonesia (`feat:`, `docs:`, `fix:`, `test:`, `chore:`).
4. Setiap PR memperbarui `CHANGELOG.md` dan, bila token berubah, `tokens/README.md`.
5. Jangan push langsung ke `main`; jangan force-push ke `main`. Merge hanya oleh pemilik repo.

## Uji lokal

```bash
node scripts/build-tokens.mjs   # bila tokens/lumbung.tokens.json berubah
node --test scripts/*.test.mjs
```

## Aturan isi

- Requirement berubah = PR di Lumbung-TownHall dulu; angka bisnis hanya dari dokumen TownHall.
- ADR bersifat immutable; keputusan baru = ADR bernomor berikutnya. Folder `versions/v*` tidak diedit.
- Sumber desain: pencil.app; berkas desain masuk repo hanya bila berformat teks.
- Jangan commit rahasia atau `graphify-out/`.
