import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquipementsComponent } from './add-equipements.component';

describe('AddEquipementsComponent', () => {
  let component: AddEquipementsComponent;
  let fixture: ComponentFixture<AddEquipementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEquipementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEquipementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
