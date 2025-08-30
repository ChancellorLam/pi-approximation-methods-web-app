import {
  Component,
  signal,
  computed,
  effect,
  inject,
  ViewChild,
  ChangeDetectionStrategy,
  DestroyRef,
  ElementRef,
} from '@angular/core';
import katex from 'katex';


@Component({
  selector: 'app-madhava-leibniz-panel',
  imports: [],
  templateUrl: './madhava-leibniz-panel.html',
  styleUrl: './madhava-leibniz-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'madhava-leibniz-panel'
  }
})
export class MadhavaLeibnizPanel {
  private destroyRef = inject(DestroyRef);

  sliderValue = signal(0);
  isPlaying = signal(false);
  intervalId: number | null = null;

  @ViewChild('madhavaLeibnizDisplay', { static: true })
  madhavaLeibnizDisplayRef!: ElementRef<HTMLElement>;

  currentTerm = computed(() => {
    // displayedCalculation displays the first four initial terms before currentTerm
    const n = this.sliderValue() + 4;

    if (n === 4) {
      return '';
    }
    if (n === 5) {
      return '+ \\frac{1}{9}';
    }
    const sign = n % 2 === 0 ? '-' : '+';
    const num = n * 2 + 7;

    return '+ \\cdots' + sign.toString() + '\\frac{1}{' + num.toString() + '}';
  });

  displayedCalculation = computed(() =>
    '\\frac{\\pi}{4} = 1 - \\frac{1}{3} + \\frac{1}{5} - \\frac{1}{7}' + this.currentTerm()
  );

  piApproximation = computed(() => {
    // keep approximation accurately aligned with displayedCalculation
    const n = this.sliderValue() + 4;

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

  constructor() {
    effect(() => {
      if (this.isPlaying()) {
        this.startPlaying()
      }
      else {
        this.stopPlaying();
      }
    });

    effect(() => {
      this.renderMath();
    });

    this.destroyRef.onDestroy(() => this.stopPlaying());
  }

  renderMath(): void {
    const el = this.madhavaLeibnizDisplayRef.nativeElement;
    katex.render(this.displayedCalculation(), el, { throwOnError: false });
  }

  togglePlay(): void {
    this.isPlaying.update((prev) => !(prev));
  }

  startPlaying(): void {
    // prevent multiple intervals
    if (this.intervalId !== null) {
      return;
    }

    // restarts only if user clicks play at the end
    if (this.sliderValue() >= 1500000) {
      this.sliderValue.set(0);
      this.isPlaying.set(true);
    }

    this.isPlaying.set(true);

    this.intervalId = window.setInterval(() => {
      const current = this.sliderValue();

      if (current > 1500000) {
        this.stopPlaying();
        return;
      }

      const next = current + 4567;
      this.sliderValue.set(next);
    }, 24);
  }

  stopPlaying(): void {
    if (this.isPlaying()) {
      this.isPlaying.set(false);
    }

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
