import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAnalyserisqueComponent } from './info-analyserisque.component';

describe('InfoAnalyserisqueComponent', () => {
  let component: InfoAnalyserisqueComponent;
  let fixture: ComponentFixture<InfoAnalyserisqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAnalyserisqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoAnalyserisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
