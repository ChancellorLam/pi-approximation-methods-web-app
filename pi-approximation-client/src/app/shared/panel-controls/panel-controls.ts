import { Component, signal, input, output, inject, ChangeDetectionStrategy, DestroyRef } from '@angular/core';

@Component({
  selector: 'app-panel-controls',
  imports: [],
  templateUrl: './panel-controls.html',
  styleUrl: './panel-controls.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'panel-controls'}
})
export class PanelControls {
  // inputs
  minSliderValue = input<number>(0);
  maxSliderValue = input.required<number>();
  stepSize = input.required<number>();
  intervalMs = input.required<number>();
  playLoop = input<boolean>(false);
  label = input<number | null>(null); // optional label

  // outputs
  valueChange = output<number>();

  // injected dependencies
  private destroyRef = inject(DestroyRef)

  // component state
  sliderValue = signal(0)
  isPlaying = signal(false);
  intervalId: number | null = null;

  readonly _ = this.destroyRef.onDestroy(() => this.stopPlaying());

  togglePlay(): void {
    if (this.isPlaying()) {
      this.stopPlaying();
    }
    else {
      if (this.playLoop()) {
        this.startPlayLoop();
      }
      else {
        this.startPlaying();
      }
    }
  }

  startPlaying(): void {
    // prevent multiple intervals
    if (this.intervalId !== null) {
      return;
    }

    // restarts only if user clicks play at the end
    if (this.sliderValue() >= this.maxSliderValue()) {
      this.sliderValue.set(0);
      this.valueChange.emit(this.sliderValue());
    }

    this.isPlaying.set(true);

    this.intervalId = window.setInterval(() => {
      const current = this.sliderValue();
      const next = current + this.stepSize();

      if (next >= this.maxSliderValue()) {
        this.sliderValue.set(this.maxSliderValue());
        this.valueChange.emit(this.sliderValue());
        this.stopPlaying();
        return;
      }

      this.sliderValue.set(next);
      this.valueChange.emit(this.sliderValue());
    }, this.intervalMs());
  }

  startPlayLoop(): void {
    // prevent multiple intervals
    if (this.intervalId !== null) {
      return;
    }

    this.isPlaying.set(true);

    this.intervalId = window.setInterval(() => {
      const current = this.sliderValue();
      const next = current >= this.maxSliderValue() ? 0 : current + this.stepSize();
      this.sliderValue.set(next);
      this.valueChange.emit(this.sliderValue());
    }, this.intervalMs());
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
