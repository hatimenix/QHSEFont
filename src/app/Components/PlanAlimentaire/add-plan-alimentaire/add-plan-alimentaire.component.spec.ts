import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanAlimentaireComponent } from './add-plan-alimentaire.component';

describe('AddPlanAlimentaireComponent', () => {
  let component: AddPlanAlimentaireComponent;
  let fixture: ComponentFixture<AddPlanAlimentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlanAlimentaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlanAlimentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
