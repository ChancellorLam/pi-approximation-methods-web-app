import {ChangeDetectionStrategy, Component, computed, OnInit, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ApproximationIteration {
  sine: number;
  cosine: number;
  tangent: number;
  innerPolygonPerimeter: number;
  outerPolygonPerimeter: number;
}

@Component({
  selector: 'app-archimedes-panel',
  imports: [FormsModule],
  templateUrl: './archimedes-panel.html',
  styleUrl: './archimedes-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchimedesPanel implements OnInit {
  protected readonly Math = Math;

  center = 300;
  radius = 240;

  sliderValue = signal(0);
  approximationMap = new Map<number, ApproximationIteration>();

  readonly numSides = computed(() => 6 * Math.pow(2, this.sliderValue()));

  readonly lowerBound = computed(() =>
    this.approximationMap.get(this.numSides())?.innerPolygonPerimeter ?? null
  );

  readonly upperBound = computed(() =>
    this.approximationMap.get(this.numSides())?.outerPolygonPerimeter ?? null
  );

  ngOnInit(): void {
    let sinOfCurrentAngle: number = 0.5;
    let cosOfCurrentAngle: number = Math.sqrt(3) / 2;
    let tanOfCurrentAngle: number = sinOfCurrentAngle / cosOfCurrentAngle;

    for (let i = 0; i < 12; i++) {
      const sides: number = 6 * Math.pow(2, i);
      const lowerBound: number = sinOfCurrentAngle * sides;
      const upperBound: number = tanOfCurrentAngle * sides;

      this.approximationMap.set(sides, {
        sine: sinOfCurrentAngle,
        cosine: cosOfCurrentAngle,
        tangent: tanOfCurrentAngle,
        innerPolygonPerimeter: lowerBound,
        outerPolygonPerimeter: upperBound
      });

      sinOfCurrentAngle = this.sinHalfAngle(cosOfCurrentAngle);
      cosOfCurrentAngle = this.cosHalfAngle(cosOfCurrentAngle);
      tanOfCurrentAngle = sinOfCurrentAngle / cosOfCurrentAngle;
    }

    console.log(this.approximationMap);
  }

  getPolygonPoints(sides: number, radius: number): string {
    const angle: number = (2 * Math.PI) / sides;
    const points: string[] = [];

    // every iteration is a rotation of angle
    for (let i = 0; i < sides; i++) {
      const currentAngle: number = i * angle;

      // convert from polar coordinates to Cartesian coordinates
      const x = this.center + radius * Math.cos(currentAngle);
      const y = this.center + radius * Math.sin(currentAngle);
      points.push(`${x},${y}`);
    }

    return points.join(' ');
  }

  // given cos(2θ), return cos(θ)
  cosHalfAngle(cosine: number): number {
    return Math.sqrt(0.5 * (1 + cosine));
  }

  // given sin(2θ), return sin(θ)
  sinHalfAngle(cosine: number): number {
    return Math.sqrt(0.5 * (1 - cosine));
  }

}
