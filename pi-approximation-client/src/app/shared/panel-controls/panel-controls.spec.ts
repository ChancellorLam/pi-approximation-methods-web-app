import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelControls } from './panel-controls';

describe('PanelControls', () => {
  let component: PanelControls;
  let fixture: ComponentFixture<PanelControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
