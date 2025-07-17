package com.github.chancellorlam.strategy;

import org.springframework.stereotype.Component;

@Component
public class MadhavaLeibnizMethodStrategy implements PiApproximationStrategy {
    @Override
    public String getName() {
        return "madhavaLeibniz";
    }

    @Override
    public double approximatePi(long iterations) {
        double piApproximation = 0;
        long denominator = 1;

        for (long i = 0; i < iterations; i++) { // 4/1 - 4/3 + 4/5 - 4/7 + 4/9...± 4/n
            if (i % 2 == 0) {	// + terms
                piApproximation = piApproximation + 4.0 / denominator;
            }
            else { // - terms
                piApproximation = piApproximation - 4.0 / denominator;
            }
            denominator = denominator + 2;
        }
        return piApproximation;
    }

}
