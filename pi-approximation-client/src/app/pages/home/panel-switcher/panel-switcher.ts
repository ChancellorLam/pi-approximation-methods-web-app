import { Component, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ArchimedesPanel } from '../approximation-panels/archimedes-panel/archimedes-panel';
import { MadhavaLeibnizPanel } from '../approximation-panels/madhava-leibniz-panel/madhava-leibniz-panel';
import { RamanujanSatoPanel } from '../approximation-panels/ramanujan-sato-panel/ramanujan-sato-panel';
import { ChudnovskyAlgorithmPanel } from '../approximation-panels/chudnovsky-algorithm-panel/chudnovsky-algorithm-panel';

@Component({
  selector: 'app-panel-switcher',
  imports: [NgComponentOutlet],
  templateUrl: './panel-switcher.html',
  styleUrl: './panel-switcher.css'
})
export class PanelSwitcher {
  panels: Type<unknown>[] = [ArchimedesPanel, MadhavaLeibnizPanel, RamanujanSatoPanel, ChudnovskyAlgorithmPanel];
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
