import { Component, signal, computed, effect, ViewChild, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import katex from 'katex';
import { PanelControls } from '../../../../shared/panel-controls/panel-controls';
import { getCorrectPiDigits } from '../../../../shared/helpers/pi-utils';


@Component({
  selector: 'app-madhava-leibniz-panel',
  imports: [PanelControls],
  templateUrl: './madhava-leibniz-panel.html',
  styleUrl: './madhava-leibniz-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'madhava-leibniz-panel' }
})
export class MadhavaLeibnizPanel {
  numTerms = signal(0);
  readonly maxSliderValue = 1640000;
  readonly stepSize = 4567;

  @ViewChild('madhavaLeibnizSeriesMathDisplay', { static: true })
  madhavaLeibnizDisplayRef!: ElementRef<HTMLElement>;

  mathRenderEffect = effect(() => {
    this.renderMath();
  });

  currentTerm = computed(() => {
    // displayedCalculation displays the first four initial terms before currentTerm
    const n = this.numTerms() + 4;

    if (n === 4) {
      return '';
    }
    if (n === 5) {
      return '+ \\frac{1}{9}';
    }
    const sign = n % 2 === 0 ? '-' : '+';
    const denominator = n * 2 - 1;

    return '+ \\cdots' + sign.toString() + '\\frac{1}{' + denominator.toString() + '}';
  });

  displayedCalculation = computed(() =>
    '\\frac{\\pi}{4} = 1 - \\frac{1}{3} + \\frac{1}{5} - \\frac{1}{7}' + this.currentTerm()
  );

  piApproximation = computed(() => {
    // keep approximation accurately aligned with displayedCalculation
    const n = this.numTerms() + 4;

    let sum = 0;
    let denominator = 1;
    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) {
        sum = sum + 1 / denominator;
      }
      else {
        sum = sum - 1 / denominator;
      }
      denominator = denominator + 2;
    }

    return sum * 4;
  });

  correctPiDigits = computed(() => {
    return getCorrectPiDigits(this.piApproximation());
  });

  onTermsChange(sliderValue: number): void {
    this.numTerms.set(sliderValue);
  }

  renderMath(): void {
    const el = this.madhavaLeibnizDisplayRef.nativeElement;
    katex.render(this.displayedCalculation(), el, { throwOnError: false });
  }
}
