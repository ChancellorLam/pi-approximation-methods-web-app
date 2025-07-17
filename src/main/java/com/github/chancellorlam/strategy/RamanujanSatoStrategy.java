package com.github.chancellorlam.strategy;

import org.springframework.stereotype.Component;

import static com.github.chancellorlam.util.MathUtils.factorial;

@Component
public class RamanujanSatoStrategy implements PiApproximationStrategy {
    @Override
    public String getName() {
        return "ramanujanSato";
    }

    @Override
    public double approximatePi(long iterations) {
        double constant = 2 * Math.sqrt(2) / Math.pow(99, 2);
        double factorialPart;
        double secondPart;
        double sum = 0;
        for (int i = 0; i <= iterations; i++) {
            factorialPart = factorial(4 * i) / Math.pow(factorial(i), 4);
            secondPart = (26390 * i + 1103) / Math.pow(396, 4 * i);
            sum = sum + (secondPart * factorialPart * constant);
        }

        return 1 / sum;
    }
}
