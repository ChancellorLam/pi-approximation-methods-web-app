import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSwitcher } from './panel-switcher';

describe('PanelSwitcher', () => {
  let component: PanelSwitcher;
  let fixture: ComponentFixture<PanelSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelSwitcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
