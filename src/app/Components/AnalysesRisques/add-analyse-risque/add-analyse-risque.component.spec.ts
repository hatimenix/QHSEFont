import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnalyseRisqueComponent } from './add-analyse-risque.component';

describe('AddAnalyseRisqueComponent', () => {
  let component: AddAnalyseRisqueComponent;
  let fixture: ComponentFixture<AddAnalyseRisqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnalyseRisqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnalyseRisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
