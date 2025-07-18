package com.github.chancellorlam.strategy;

public interface PiApproximationStrategy {
    String getName();
    double approximatePi(long iterations);
}
