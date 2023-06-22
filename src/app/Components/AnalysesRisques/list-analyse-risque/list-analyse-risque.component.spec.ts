import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnalyseRisqueComponent } from './list-analyse-risque.component';

describe('ListAnalyseRisqueComponent', () => {
  let component: ListAnalyseRisqueComponent;
  let fixture: ComponentFixture<ListAnalyseRisqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnalyseRisqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAnalyseRisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
