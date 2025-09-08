import { Component, signal, computed, effect, ViewChild, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { PanelControls } from '../../../../shared/panel-controls/panel-controls';
import katex from 'katex';

@Component({
  selector: 'app-chudnovsky-algorithm-panel',
  imports: [PanelControls],
  templateUrl: './chudnovsky-algorithm-panel.html',
  styleUrl: './chudnovsky-algorithm-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'chudnovsky-algorithm-panel' }
})
export class ChudnovskyAlgorithmPanel {
  numTerms = signal(0);
  readonly maxSliderValue = 1;
  readonly stepSize = 1;

  @ViewChild('chudnovskyAlgorithmMathDisplay', { static: true })
  chudnovskyAlgorithmDisplayRef!: ElementRef<HTMLElement>;

  mathRenderEffect = effect(() => {
    this.renderMath();
  });

  displayedCalculation = computed(() => {
    return '\\displaystyle \\frac{1}{\\pi} = 12' +
      '\\sum_{k=0}^{\\infty}\\frac{(-1)^k(6k)!(545140134k + 13591409)}{(3k)!(k!)^3(640320)^{3k + 3/2}}'
  });

  piApproximation = computed(() => {
    const n = this.numTerms();

    let sum = 0;
    for (let k = 0; k <= n; k++) {
      sum = sum + ( Math.pow(-1, k) * this.factorial(6 * k) * ( (545140134 * k) + 13591409) ) /
        ( this.factorial(3 * k) * Math.pow(this.factorial(k), 3) * Math.pow(640320, ((3 * k) + (3 / 2)) ) );
    }

    return 1 / ( 12 * sum );
  });

  correctPiDigits = computed(() => {
    const desiredNumDigits = 17;
    const approximationString = this.piApproximation().toFixed(desiredNumDigits);

    let numMatchingDigits = 0;
    while (
      numMatchingDigits < desiredNumDigits &&
      approximationString[numMatchingDigits] === Math.PI.toString()[numMatchingDigits]
      ) {
      numMatchingDigits++;
    }

    return {
      matchingDigits: approximationString.slice(0, numMatchingDigits),
      nonMatchingDigits: approximationString.slice(numMatchingDigits, approximationString.length - 2)
    }
  });

  onTermsChange(sliderValue: number): void {
    this.numTerms.set(sliderValue);
  }

  renderMath(): void {
    const el = this.chudnovskyAlgorithmDisplayRef.nativeElement;
    katex.render(this.displayedCalculation(), el, { throwOnError: false });
  }

  // Computes the factorial of a non-negative integer n.
  // Assumes n >= 0. Invalid input checks are skipped for extra performance.
  // Will only support up to 20!.
  factorial(n: number): number {
    let result = 1;

    for (let i = 2; i <= n; i++) {
      result = i * result;
    }
    return result;
  }
}
