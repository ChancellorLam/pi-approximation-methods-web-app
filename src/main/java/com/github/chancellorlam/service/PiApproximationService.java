package com.github.chancellorlam.service;

import com.github.chancellorlam.strategy.PiApproximationStrategy;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class PiApproximationService {
    private final Map<String, PiApproximationStrategy> strategies;

    @Autowired
    public PiApproximationService(List<PiApproximationStrategy> strategyList) {
        strategies = new HashMap<>();
        for (PiApproximationStrategy strategy : strategyList) {
            strategies.put(strategy.getName().toLowerCase(), strategy);
        }
    }

    public double approximate(String methodName, long iterations) {
        PiApproximationStrategy strategy = strategies.get(methodName.toLowerCase());
        if (strategy == null) {
            throw new IllegalArgumentException("No such approximation method: " + methodName);
        }
        return strategy.approximatePi(iterations);
    }

    public Set<String> getAvailableMethods() {
        return strategies.keySet();
    }
}
