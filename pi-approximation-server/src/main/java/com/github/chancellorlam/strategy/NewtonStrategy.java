package com.github.chancellorlam.strategy;

import org.springframework.stereotype.Component;
import org.apache.commons.math3.analysis.UnivariateFunction;
import org.apache.commons.math3.analysis.integration.RombergIntegrator;

@Component
public class NewtonStrategy implements PiApproximationStrategy {
    public String getName() {
        return "newton";
    }

    public double approximatePi(long iterations) {
        // Define function: f(x) = sqrt(x - x^2) and create high precision integrator
        UnivariateFunction f = x -> Math.sqrt(x - x * x);
        RombergIntegrator integrator = new RombergIntegrator(
                1e-13,
                1e-13,
                3,
                32
        );

        // Integrate over [0, 0.25]
        double areaUnderCurve = integrator.integrate(Integer.MAX_VALUE, f, 0.0, 0.25);
        return 3 * Math.sqrt(3) / 4 + 24 * areaUnderCurve;  // use area under curve in Newton's method
    }

}
