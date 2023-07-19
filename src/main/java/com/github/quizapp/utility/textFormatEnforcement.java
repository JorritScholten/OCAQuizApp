package com.github.quizapp.utility;

import java.util.ArrayList;

public class textFormatEnforcement {



    static public boolean checkEqualsIgnoreCase( String value, ArrayList<String>tags){
        for(String tag:tags){
            if(tag.equalsIgnoreCase(value)){return  true;}
        }

        return  false;
    }


    static boolean equalsWithLeniency(String comparator,String value,int leniency){
        int res = 0;
        int counter = 0;
        char[] comparatorValues=comparator.toCharArray();
        for (char comparatorValue : comparatorValues) {
            if( counter>=value.length()){res++; continue;}
            if (value.toCharArray()[counter] == comparatorValue) {
                counter++;
            } else res++;

        }
        return res <= leniency;
    }

    public static boolean equalsWithTrailingCharacters(String comparator,String value, int target){
        if(comparator.length()<value.length()){return false;}
        else return comparator.startsWith(value) && Math.abs(comparator.length() - value.length()) <= target;
    }
}
