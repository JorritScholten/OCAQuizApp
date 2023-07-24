package com.github.quizapp.utility;

import java.util.ArrayList;

public class TextFormatEnforcement {


    public static final char[] FORBIDDEN_CHARS = {'^', '[', ']', '<', '>', ')', '$', '@', '#', '\'', '\"', '(', ')', '{', '}'};
    public static final String[] IGNORED_CHARS = {" ", "-", "\\."};
    public static final int LENIENCY = 1;
    public static final int TRAILING_CHARACTERS_ALLOWED = 1;

    public static boolean enforceTextFormatting(String input, ArrayList<String> tags) {
        if (checkEqualsIgnoreCase(input, tags)) {
            return true;
        }
        input = input.toLowerCase();
        System.out.println(input);
        for (String tag : tags) {
            tag = tag.toLowerCase();

            System.out.println(" :" + tag);
            if (hasForbiddenChars(input, FORBIDDEN_CHARS)) {
                return true;
            } else if (equalsWithTrailingCharacters(tag, input, TRAILING_CHARACTERS_ALLOWED)) {
                System.out.println(1);
                return true;
            } else if (equalsWithAbsoluteLeniency(tag, input, LENIENCY)) {
                System.out.println(2);
                return true;
            } else if (equalsIgnoreChars(tag, input, IGNORED_CHARS)) {
                System.out.println(3);
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
        System.out.println(res);

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
