package com.github.quizapp.utility;

import java.util.List;
import java.util.Optional;

public class TextFormatEnforcement {
    public static final char[] FORBIDDEN_CHARS = {'^', '[', ']', '<', '>', ')', '$', '@', '#', '\'', '\"', '(', ')', '{', '}'};
    public static final String[] IGNORED_CHARS = {" ", "-", "\\."};
    public static final int LENIENCY = 1;
    public static final int TRAILING_CHARACTERS_ALLOWED = 1;

    public static Optional<String> enforceTextFormatting(String input, List<String> tags) {
        if (checkEqualsIgnoreCase(input, tags)) {
            return Optional.of(input.toLowerCase());
        }
        input = input.toLowerCase();
        for (String tag : tags) {
            tag = tag.toLowerCase();

            if (hasForbiddenChars(input, FORBIDDEN_CHARS)) {
                return Optional.of(tag);
            } else if (equalsWithTrailingCharacters(tag, input, TRAILING_CHARACTERS_ALLOWED)) {
                return Optional.of(tag);
            } else if (equalsWithAbsoluteLeniency(tag, input, LENIENCY)) {
                return Optional.of(tag);
            } else if (equalsIgnoreChars(tag, input, IGNORED_CHARS)) {
                return Optional.of(tag);
            }
        }
        return Optional.empty();
    }

    static public boolean checkEqualsIgnoreCase(String value, List<String> tags) {
        for (String tag : tags) {
            if (tag.equalsIgnoreCase(value)) {
                return true;
            }
        }
        return false;
    }

    public static boolean equalsWithAbsoluteLeniency(String comparator, String input, int leniency) {
        int res = 0;
        int numberRes = 0;
        char[] comparatorValues = comparator.toCharArray();
        char[] inputValues = input.toCharArray();


        res += Math.abs(comparatorValues.length - inputValues.length);
        int index = Math.min(comparatorValues.length, inputValues.length);
        for (int i = 0; i < index; i++) {
            char inputValue = inputValues[i];
            char comparatorValue = comparatorValues[i];
            if (comparatorValue != inputValue && comparatorValue >= '0' && comparatorValue <= '9' && inputValue >= '0' && inputValue <= '9') {
                numberRes++;
            } else if (comparatorValues[i] != inputValues[i]) {
                res++;
            }
        }

        return (res != 0 || numberRes <= 0) && res <= leniency;
    }

    public static boolean equalsWithTrailingCharacters(String comparator, String value, int target) {
        int sizeDiff = comparator.length() - value.length();
        return sizeDiff > 0 ? comparator.startsWith(value) : value.startsWith(comparator) && Math.abs(comparator.length() - value.length()) <= target;
    }

    public static boolean equalsIgnoreChars(String comparator, String value, String... cases) {
        if (cases.length == 0) {
            return comparator.equals(value);
        }

        StringBuilder regexBuilder = new StringBuilder();
        for (String val : cases) {
            regexBuilder.append("|");
            regexBuilder.append(val);
        }

        regexBuilder.deleteCharAt(0);

        String regX = regexBuilder.toString();
        return comparator.replaceAll(regX, "").equals(value.replaceAll(regX, ""));
    }

    public static boolean hasForbiddenChars(String input, char... targets) {
        for (char val : targets) {
            if (input.contains(String.valueOf(val))) {
                return true;
            }
        }
        return false;
    }
}
