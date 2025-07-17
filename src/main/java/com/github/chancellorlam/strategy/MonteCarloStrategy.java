package com.github.chancellorlam.strategy;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class MonteCarloStrategy implements PiApproximationStrategy {
    @Override
    public String getName() {
        return "monteCarlo";
    }

    @Override
    public double approximatePi(long iterations) {
        Random random = new Random();
        long pointsInsideCircle = 0;

        for (long i = 0; i < iterations; i++) {
            // Creates random x and y coordinates from 0 to 1 which creates a point in a square
            double x = random.nextDouble();
            double y = random.nextDouble();

            // Given x and y coordinates, Pythagorean theorem can be used to determine diagonal distance to the origin
            double distance = Math.sqrt(x * x + y * y);

            if (distance <= 1) {
                pointsInsideCircle++;
            }
        }

        return pointsInsideCircle / (double) iterations * 4;
    }

}