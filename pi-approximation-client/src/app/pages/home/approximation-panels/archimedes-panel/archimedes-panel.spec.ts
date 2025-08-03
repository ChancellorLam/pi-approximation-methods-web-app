import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchimedesPanel } from './archimedes-panel';

describe('ArchimedesPanel', () => {
  let component: ArchimedesPanel;
  let fixture: ComponentFixture<ArchimedesPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchimedesPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchimedesPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
