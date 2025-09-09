import { Component, signal, computed, effect, ViewChild, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { PanelControls } from '../../../../shared/panel-controls/panel-controls';
import katex from 'katex';
import { getCorrectPiDigits } from '../../../../shared/helpers/pi-utils';

@Component({
  selector: 'app-ramanujan-sato-panel',
  imports: [PanelControls],
  templateUrl: './ramanujan-sato-panel.html',
  styleUrl: './ramanujan-sato-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ramanujan-sato-panel' }
})
export class RamanujanSatoPanel {
  numTerms = signal(0);
  readonly maxSliderValue = 1;
  readonly stepSize = 1;

  @ViewChild('ramanujanSatoSeriesMathDisplay', { static: true })
  ramanujanSatoDisplayRef!: ElementRef<HTMLElement>;

  mathRenderEffect = effect(() => {
    this.renderMath();
  });

  displayedCalculation = computed(() => {
    return '\\displaystyle \\frac{1}{\\pi} = \\frac{2\\sqrt{2}}{99^2}' +
      '\\sum_{k=0}^{' + this.numTerms() + '}\\frac{(4k)!}{k!^4}\\frac{26390k + 1103}{396^{4k}}'
  });

  piApproximation = computed(() => {
    const n = this.numTerms();

    let sum = 0;
    for (let k = 0; k <= n; k++) {
      sum = sum +
        ( this.factorial(4 * k) ) / ( Math.pow(this.factorial(k), 4) ) *
        ( (26390 * k) + 1103 ) / ( Math.pow(396, 4 * k) );
    }

    return 1 / ( (2 * Math.SQRT2) / Math.pow(99, 2) * sum );
  });

  correctPiDigits = computed(() => {
    return getCorrectPiDigits(this.piApproximation());
  });

  onTermsChange(sliderValue: number): void {
    this.numTerms.set(sliderValue);
  }

  renderMath(): void {
    const el = this.ramanujanSatoDisplayRef.nativeElement;
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
