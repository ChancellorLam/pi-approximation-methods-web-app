import java.lang.Math;
public class ExtraMath {
    static long factorial(int maxFactor) {  // long data type will only support up to 20
        long product = 1;

        for (long i = 2; i <= maxFactor; i++) {
            product = i * product;
        }
        return product;
    }

    static double cosHalfAngle(double currentCosine) {  // given cos(2θ), return cos(θ)
        return Math.sqrt(0.5 * (1 + currentCosine));
    }

    static double sinHalfAngle(double currentCosine) {  // given sin(2θ), return sin(θ)
        return Math.sqrt(0.5 * (1 - currentCosine));
    }
}
