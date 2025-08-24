import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadhavaLeibnizPanel } from './madhava-leibniz-panel';

describe('MadhavaLeibnizPanel', () => {
  let component: MadhavaLeibnizPanel;
  let fixture: ComponentFixture<MadhavaLeibnizPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MadhavaLeibnizPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MadhavaLeibnizPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
