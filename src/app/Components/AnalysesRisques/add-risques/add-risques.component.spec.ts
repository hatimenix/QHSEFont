import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRisquesComponent } from './add-risques.component';

describe('AddRisquesComponent', () => {
  let component: AddRisquesComponent;
  let fixture: ComponentFixture<AddRisquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRisquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRisquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
