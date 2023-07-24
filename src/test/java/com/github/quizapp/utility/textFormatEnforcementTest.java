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


    static Stream<Arguments> provideArgumentsForEnforceTextFormatting() {

        /*
       sample list of values that act as tags in the database
         */
        ArrayList<String> tags = new ArrayList<>(List.of("parameter", "functions", "chapter 2.0", "Lists"
        ));

        /*
        list of tags to be tested against the database
         */

        return Stream.of(
                //capital letter
                Arguments.of("Parameter", tags, true),
                //full equals
                Arguments.of("parameter", tags, true),
                //control case 1
                Arguments.of("functParam", tags, false),
                //control case 2
                Arguments.of("Mychapter",tags,false)
        );
    }

    static Stream<Arguments> provideArgumentsForEqualsIgnoreChars() {
        return Stream.of(
                //true case on character - and space
                Arguments.of("sub chapter", "sub-chapter", true, new String[]{" ", "-", "!"}),
                //true case on just space
                Arguments.of("main chapter", "main chapter", true, new String[]{" ", "-","!"}),
                //test on empty list without special characters
                Arguments.of("main chapter", "main chapter", true, new String[]{}),
                //test on empty list with underscore
                Arguments.of("main chapter", "main_chapter", false, new String[]{}),
                Arguments.of("bad chapter", "main chapter", false, new String[]{"_", "-"})
        );
    }

    static Stream<Arguments> provideArgumentsForHasForbiddenChars() {
        return Stream.of(
                //test values in String argument
                Arguments.of("wr!ng", new char[]{'!'}, true),
                //test values not in String Argument
                Arguments.of("*right*", new char[]{'?'}, false),
                //test case on single length String
                Arguments.of("!", new char[]{'!'}, true),
                //test on empty String
                Arguments.of("", new char[]{'!'}, false),
                //test on empty List
                Arguments.of("wr!ng", new char[]{}, false)
        );
    }

    @ParameterizedTest
    @CsvSource({"t3st,test,1,true", "chapters,chapter,1,true", "valies,values,1,true", "parameter,Paremeter,2,true", "test,tests,0,false"})
    void equalsWithLeniencyTest(String comparator, String input, int leniency, boolean result) {
        assertEquals(TextFormatEnforcement.equalsWithAbsoluteLeniency(comparator, input, leniency), result);
    }

    @ParameterizedTest
    @CsvSource({"t3st,test,1,false", "chapters,chapter,1,true", "chapter,chapters,1,true", "value,values,0,false", "parameter,Parameters,1,false", "test,test,0,true",})
    void equalsWithTrailingCharactersTest(String comparator, String input, int leniency, boolean result) {
        assertEquals(TextFormatEnforcement.equalsWithTrailingCharacters(comparator, input, leniency), result);
    }


    /*
   arguments provided by static method provideForEqualsIgnoreChars
    */
    @ParameterizedTest
    @MethodSource("provideArgumentsForEqualsIgnoreChars")
    void equalsIgnoreCharsTest(String comparator, String input, boolean result, String[] cases) {
        assertEquals(TextFormatEnforcement.equalsIgnoreChars(comparator, input, cases), result);
    }

    /*
   arguments provided by static method provideForHasForbiddenChars

    */
    @ParameterizedTest
    @MethodSource("provideArgumentsForHasForbiddenChars")
    void hasForbiddenCharsTest(String input, char[] targets, boolean result) {
        assertEquals(TextFormatEnforcement.hasForbiddenChars(input, targets), result);
    }


    /*
    arguments provided by static method provideForEnforceTextFormatting

     */
    @ParameterizedTest
    @MethodSource("provideArgumentsForEnforceTextFormatting")
    void enforceTextFormattingTest(String value, ArrayList<String> tags, boolean result) {
        assertEquals(TextFormatEnforcement.enforceTextFormatting(value,tags),result);
    }

}