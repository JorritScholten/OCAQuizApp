package com.github.quizapp.utility;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TextFormatEnforcementTest {

    static Stream<Arguments> provideForEnforceTextFormatting() {
        ArrayList<String> tags = new ArrayList<>(List.of("parameter", "functions", "chapter 2.0", "Lists"
        ));

        return Stream.of(
                Arguments.of("Parameter", tags, true),
                Arguments.of("parameter", tags, true),
                Arguments.of("functParam", tags, false),
                Arguments.of("Mychapter",tags,false)
        );
    }

    static Stream<Arguments> provideForEqualsIgnoreChars() {
        return Stream.of(
                Arguments.of("sub chapter", "sub-chapter", true, new String[]{" ", "-", "!"}),
                Arguments.of("main chapter", "main chapter", true, new String[]{" ", "-"}),
                Arguments.of("main chapter", "main chapter", true, new String[]{}),
                Arguments.of("main chapter", "main_chapter", false, new String[]{}),
                Arguments.of("bad chapter", "main chapter", false, new String[]{"_", "-"})
        );
    }

    static Stream<Arguments> provideForHasForbiddenChars() {
        return Stream.of(
                Arguments.of("wr!ng", new char[]{'!'}, true),
                Arguments.of("*right*", new char[]{'?'}, false),
                Arguments.of("!", new char[]{'!'}, true),
                (Arguments.of("", new char[]{'!'}, false)),
                Arguments.of("wr!ng", new char[]{}, false)
        );
    }

    @ParameterizedTest
    @CsvSource({"t3st,test,1,true", "chapters,chapter,1,true", "valies,values,1,true", "parameter,Paremeter,2,true", "test,tests,0,false"})
    void equalsWithLeniency(String comparator, String input, int leniency, boolean result) {
        assertEquals(TextFormatEnforcement.equalsWithAbsoluteLeniency(comparator, input, leniency), result);
    }

    @ParameterizedTest
    @CsvSource({"t3st,test,1,false", "chapters,chapter,1,true", "chapter,chapters,1,true", "value,values,0,false", "parameter,Parameters,1,false", "test,test,0,true",})
    void equalsWithTrailingCharacters(String comparator, String input, int leniency, boolean result) {
        assertEquals(TextFormatEnforcement.equalsWithTrailingCharacters(comparator, input, leniency), result);
    }

    @ParameterizedTest
    @MethodSource("provideForEqualsIgnoreChars")
    void equalsIgnoreChars(String comparator, String input, boolean result, String[] cases) {
        assertEquals(TextFormatEnforcement.equalsIgnoreChars(comparator, input, cases), result);
    }

    @ParameterizedTest
    @MethodSource("provideForHasForbiddenChars")
    void hasForbiddenChars(String input, char[] targets, boolean result) {
        assertEquals(TextFormatEnforcement.hasForbiddenChars(input, targets), result);
    }

    @ParameterizedTest
    @MethodSource("provideForEnforceTextFormatting")
    void enforceTextFormatting(String value, ArrayList<String> tags, boolean result) {
        assertEquals(TextFormatEnforcement.enforceTextFormatting(value,tags),result);
    }

}