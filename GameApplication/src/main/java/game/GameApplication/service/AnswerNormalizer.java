package game.GameApplication.service;

import java.text.Normalizer;

// Macht Antworten vergleichbar: ignoriert Groß-/Kleinschreibung, Akzente, Sonderzeichen und doppelte Leerzeichen
public final class AnswerNormalizer {

    private AnswerNormalizer() {
    }

    public static String normalize(String value) {
        if (value == null) {
            return "";
        }

        String normalized = value
                .replace("ß", "ss")
                .replace("æ", "ae")
                .replace("œ", "oe")
                .replace("ø", "o")
                .replace("Æ", "AE")
                .replace("Œ", "OE")
                .replace("Ø", "O");

        return Normalizer.normalize(normalized, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .replaceAll("[^a-zA-Z0-9 ]", "")
                .replaceAll("\\s+", " ")
                .toLowerCase()
                .trim();
    }

    public static boolean matches(String expected, String actual) {
        return normalize(expected).equals(normalize(actual));
    }
}
