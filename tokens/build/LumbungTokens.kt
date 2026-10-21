// Dihasilkan oleh scripts/build-tokens.mjs dari tokens/lumbung.tokens.json (v1.0.0). Jangan edit.
// Tanpa dependensi Compose: warna = ARGB Long, ukuran = angka dp/sp polos.
// Di app-kmp: Color(LumbungTokens.Color.hijauDaun), Radius.tombol.dp, dst.
package id.codingskuy.lumbung.design

object LumbungTokens {
    const val VERSI = "1.0.0"

    object Color {
        const val hijauDaun: Long = 0xFF2E7D32
        const val hijauDaunTua: Long = 0xFF1B5E20
        const val kuningPanen: Long = 0xFFF9A825
        const val kuningPanenMuda: Long = 0xFFFFF8E1
        const val abuKarung: Long = 0xFF616161
        const val abuGaris: Long = 0xFF757575
        const val merahSusut: Long = 0xFFC62828
        const val merahSusutMuda: Long = 0xFFFFEBEE
        const val oranyeOffline: Long = 0xFFBF360C
        const val biruInfo: Long = 0xFF1565C0
        const val putihKapas: Long = 0xFFFAFAFA
        const val putih: Long = 0xFFFFFFFF
        const val tinta: Long = 0xFF212121
    }

    object Font {
        const val sans: String = "sansserif"
        const val mono: String = "monospace"
    }

    object TypeAngkaTimbang {
        const val SIZE_SP = 56
        const val LINE_SP = 64
        const val WEIGHT = 700
        const val FAMILY = "monospace"
        const val TABULAR = true
    }
    object TypeJudulBesar {
        const val SIZE_SP = 28
        const val LINE_SP = 36
        const val WEIGHT = 700
        const val FAMILY = "sansserif"
        const val TABULAR = false
    }
    object TypeJudul {
        const val SIZE_SP = 20
        const val LINE_SP = 28
        const val WEIGHT = 700
        const val FAMILY = "sansserif"
        const val TABULAR = false
    }
    object TypeIsiBesar {
        const val SIZE_SP = 18
        const val LINE_SP = 26
        const val WEIGHT = 400
        const val FAMILY = "sansserif"
        const val TABULAR = false
    }
    object TypeIsi {
        const val SIZE_SP = 14
        const val LINE_SP = 20
        const val WEIGHT = 400
        const val FAMILY = "sansserif"
        const val TABULAR = false
    }
    object TypeLabel {
        const val SIZE_SP = 12
        const val LINE_SP = 16
        const val WEIGHT = 600
        const val FAMILY = "sansserif"
        const val TABULAR = false
    }
    object TypeStruk {
        const val SIZE_SP = 12
        const val LINE_SP = 16
        const val WEIGHT = 400
        const val FAMILY = "monospace"
        const val TABULAR = false
    }

    object Radius {
        const val tombol: Int = 8
        const val input: Int = 8
        const val kartu: Int = 12
        const val chip: Int = 999
    }

    object Space {
        const val s1: Int = 4
        const val s2: Int = 8
        const val s3: Int = 12
        const val s4: Int = 16
        const val s5: Int = 24
        const val s6: Int = 32
        const val s7: Int = 48
    }

    object Size {
        const val targetMin: Int = 48
        const val targetSarung: Int = 56
        const val garisFokus: Int = 3
    }
}
