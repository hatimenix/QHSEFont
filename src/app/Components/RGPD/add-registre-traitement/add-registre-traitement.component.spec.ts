import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegistreTraitementComponent } from './add-registre-traitement.component';

describe('AddRegistreTraitementComponent', () => {
  let component: AddRegistreTraitementComponent;
  let fixture: ComponentFixture<AddRegistreTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegistreTraitementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRegistreTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
