package com.github.chancellorlam.strategy;

import org.springframework.stereotype.Component;

import static com.github.chancellorlam.util.MathUtils.factorial;

@Component
public class ChudnovskyAlgorithmStrategy implements PiApproximationStrategy {
    @Override
    public String getName() {
        return "ramanujanSato";
    }

    @Override
    public double approximatePi(long iterations) {
        double sum = 0;
        for (int i = 0; i <= iterations; i++) {
            double numerator = Math.pow(-1, i) * factorial(6 * i) * (545140134 * i + 13591409);
            double denominator = factorial(3 * i) * Math.pow(factorial(i), 3) *
                    Math.pow(640320, (3 * i + 1.5));
            sum = sum + numerator/denominator * 12;
        }

        return 1 / sum;
    }
}
