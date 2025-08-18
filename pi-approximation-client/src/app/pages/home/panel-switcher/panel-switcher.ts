import { Component, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ArchimedesPanel } from '../approximation-panels/archimedes-panel/archimedes-panel';

@Component({
  selector: 'app-panel-switcher',
  imports: [NgComponentOutlet],
  templateUrl: './panel-switcher.html',
  styleUrl: './panel-switcher.css'
})
export class PanelSwitcher {
  panels: Type<unknown>[] = [ArchimedesPanel];
  currentIndex = 0;

  get currentPanel() {
    return this.panels[this.currentIndex];
  }

  previousPanel() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextPanel() {
    if (this.currentIndex < this.panels.length - 1) {
      this.currentIndex++;
    }
  }
}
