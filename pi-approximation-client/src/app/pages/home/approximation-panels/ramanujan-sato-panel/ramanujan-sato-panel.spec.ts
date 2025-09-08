import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamanujanSatoPanel } from './ramanujan-sato-panel';

describe('RamanujanSatoPanel', () => {
  let component: RamanujanSatoPanel;
  let fixture: ComponentFixture<RamanujanSatoPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RamanujanSatoPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RamanujanSatoPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
