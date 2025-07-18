package com.github.chancellorlam.controller;

import com.github.chancellorlam.service.PiApproximationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/pi")
public class PiApproximationController {
    private final PiApproximationService service;

    @Autowired
    public PiApproximationController(PiApproximationService service) {
        this.service = service;
    }

    @GetMapping("/approximate")
    public ResponseEntity<Double> approximatePi(
            @RequestParam String method,
            @RequestParam(defaultValue = "1000") long iterations) {
        double result = service.approximate(method, iterations);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/methods")
    public ResponseEntity<Set<String>> getMethods() {
        return ResponseEntity.ok(service.getAvailableMethods());
    }
}
