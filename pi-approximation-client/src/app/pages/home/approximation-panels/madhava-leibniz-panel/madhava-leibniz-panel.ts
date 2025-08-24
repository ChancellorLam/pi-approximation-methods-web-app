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
    const n = this.sliderValue();
    if (n === 0) {
      return '';
    }
    if (n === 1) {
      return '+ \\frac{1}{9}';
    }

    const sign = n % 2 === 0 ? '-' : '+';
    const num = n * 2 + 7;
    return '+ \\cdots' + sign.toString() + '\\frac{1}{' + num.toString() + '}';
  });

  displayedCalculation = computed(() =>
    '\\frac{\\pi}{4} = 1 - \\frac{1}{3} + \\frac{1}{5} - \\frac{1}{7}' + this.currentTerm()
  );

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
    if (this.sliderValue() >= 1000000) {
      this.sliderValue.set(0);
      this.isPlaying.set(true);
    }

    this.isPlaying.set(true);

    this.intervalId = window.setInterval(() => {
      const current = this.sliderValue();

      if (current > 1000000) {
        this.stopPlaying();
        return;
      }

      const next = current + 789;
      this.sliderValue.set(next);
    }, 4);
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
