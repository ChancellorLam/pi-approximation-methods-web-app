import { Component, signal, computed, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PanelControls } from '../../../../shared/panel-controls/panel-controls';

interface ApproximationIteration {
  sine: number;
  cosine: number;
  tangent: number;
  innerPolygonPerimeter: number;
  outerPolygonPerimeter: number;
}

@Component({
  selector: 'app-archimedes-panel',
  imports: [PanelControls],
  templateUrl: './archimedes-panel.html',
  styleUrl: './archimedes-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchimedesPanel implements OnInit {
  protected readonly Math = Math;
  readonly center = 300;
  readonly radius = 240;
  approximationMap = new Map<number, ApproximationIteration>();

  numSides = signal(6);

  readonly lowerBound = computed(() =>
    this.approximationMap.get(this.numSides())?.innerPolygonPerimeter ?? null
  );

  readonly upperBound = computed(() =>
    this.approximationMap.get(this.numSides())?.outerPolygonPerimeter ?? null
  );

  readonly matchingDigitsClassification = computed(()=> {
    const desiredNumDigits = 9;
    const lower = this.lowerBound();
    const upper = this.upperBound();

    if (lower == null || upper == null) {
      return {
        matchingLowerDigits: '',
        nonMatchingLowerDigits: '',
        matchingUpperDigits: '',
        nonMatchingUpperDigits: ''
      };
    }

    const lowerStr = lower.toFixed(desiredNumDigits);
    const upperStr = upper.toFixed(desiredNumDigits);

    let numMatchingDigits = 0;
    while (numMatchingDigits < desiredNumDigits && lowerStr[numMatchingDigits] === upperStr[numMatchingDigits]) {
      numMatchingDigits++;
    }

    return {
      matchingLowerDigits: lowerStr.slice(0, numMatchingDigits),
      nonMatchingLowerDigits: lowerStr.slice(numMatchingDigits),
      matchingUpperDigits: upperStr.slice(0, numMatchingDigits),
      nonMatchingUpperDigits: upperStr.slice(numMatchingDigits)
    }
  });


  ngOnInit(): void {
    let sinOfCurrentAngle = 0.5;
    let cosOfCurrentAngle = Math.sqrt(3) / 2;
    let tanOfCurrentAngle: number = sinOfCurrentAngle / cosOfCurrentAngle;

    for (let i = 0; i < 12; i++) {
      const sides = 6 * Math.pow(2, i);
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

  onSidesChange(sliderValue: number): void {
    this.numSides.set(6 * Math.pow(2, sliderValue));
  }

  getPolygonPoints(sides: number, radius: number): string {
    const angle: number = (2 * Math.PI) / sides;
    const points: string[] = [];

    // every iteration is a rotation of size angle
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
