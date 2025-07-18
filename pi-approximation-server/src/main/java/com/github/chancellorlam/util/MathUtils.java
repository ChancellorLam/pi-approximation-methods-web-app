package com.github.chancellorlam.util;

public class MathUtils {
    /**
     * Computes the factorial of a non-negative integer n.
     * Assumes n >= 0. Invalid input checks are skipped for extra performance.
     * Long data type will only support up to 20!.
     */
    public static long factorial(int n) {
        long result = 1;

        for (int i = 2; i <= n; i++) {
            result = i * result;
        }
        return result;
    }
}
