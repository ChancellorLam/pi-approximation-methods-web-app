import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChudnovskyAlgorithmPanel } from './chudnovsky-algorithm-panel';

describe('ChudnovskyAlgorithmPanel', () => {
  let component: ChudnovskyAlgorithmPanel;
  let fixture: ComponentFixture<ChudnovskyAlgorithmPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChudnovskyAlgorithmPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChudnovskyAlgorithmPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
