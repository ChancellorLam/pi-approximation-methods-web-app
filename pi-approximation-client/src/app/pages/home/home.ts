import { Component } from '@angular/core';
import {PanelSwitcher} from './panel-switcher/panel-switcher';

@Component({
  selector: 'app-home',
  imports: [PanelSwitcher],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
