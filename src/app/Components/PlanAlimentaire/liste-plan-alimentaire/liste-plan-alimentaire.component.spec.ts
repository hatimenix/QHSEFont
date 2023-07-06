import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePlanAlimentaireComponent } from './liste-plan-alimentaire.component';

describe('ListePlanAlimentaireComponent', () => {
  let component: ListePlanAlimentaireComponent;
  let fixture: ComponentFixture<ListePlanAlimentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePlanAlimentaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePlanAlimentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
