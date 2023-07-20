package com.github.quizapp.utility;

import java.util.ArrayList;

public class TextFormatEnforcement {

    public static final char[] FORBIDDEN_CHARS = {'<', '>', ')', '@', '#', '(', ')', '"', '{', '}'};
    public static final char[] IGNORED_CHARS = {' ', '-', '.'};
    public static final int  LENIENCY=1;
    public static final int  TRAILING_CHARACTERS_ALLOWED=1;


    public static boolean enforceTextFormatting(String input, ArrayList<String> tags) {
        if (checkEqualsIgnoreCase(input, tags)) {
            return true;
        }
        input=input.toLowerCase();
        for (String tag : tags) {
           tag= tag.toLowerCase();
            if (hasForbiddenChars(input, FORBIDDEN_CHARS)) {
                return true;
            } else if (equalsWithTrailingCharacters(tag, input, TRAILING_CHARACTERS_ALLOWED )) {
                return true;
            } else if (equalsWithAbsoluteLeniency(tag, input, LENIENCY) || equalsWithTrailingCharacters(tag, input, 1)) {
                return true;
            } else if (equalsIgnoreChars(tag, input, IGNORED_CHARS)) {
                return true;
            }
        }

        return false;
    }

    static public boolean checkEqualsIgnoreCase(String value, ArrayList<String> tags) {
        for (String tag : tags) {
            if (tag.equalsIgnoreCase(value)) {
                return true;
            }
        }

        return false;
    }

    public static boolean equalsWithAbsoluteLeniency(String comparator, String input, int leniency) {
        int res = 0;
        char[] comparatorValues = comparator.toCharArray();
        char[] inputValues = input.toCharArray();

        res += Math.abs(comparatorValues.length - inputValues.length);
        int index = Math.min(comparatorValues.length, inputValues.length);
        for (int i = 0; i < index; i++) {
            if (comparatorValues[i] != inputValues[i]) {
                res++;
            }
        }
        return res <= leniency;
    }

    public static boolean equalsWithTrailingCharacters(String comparator, String value, int target) {

        int sizeDiff = comparator.length() - value.length();
        System.out.println(sizeDiff);
        return sizeDiff > 0 ? comparator.startsWith(value) : value.startsWith(comparator) && Math.abs(comparator.length() - value.length()) <= target;
    }

    public static boolean equalsIgnoreChars(String comparator, String value, char... cases) {
        if (cases.length == 0) {
            return comparator.equals(value);
        }

        StringBuilder regexBuilder = new StringBuilder();
        for (char val : cases) {
            regexBuilder.append('|');
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
