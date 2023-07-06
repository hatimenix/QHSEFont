import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnalyseRisqueComponent } from './update-analyse-risque.component';

describe('UpdateAnalyseRisqueComponent', () => {
  let component: UpdateAnalyseRisqueComponent;
  let fixture: ComponentFixture<UpdateAnalyseRisqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAnalyseRisqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAnalyseRisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
