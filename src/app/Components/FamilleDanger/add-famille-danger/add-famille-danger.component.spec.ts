import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamilleDangerComponent } from './add-famille-danger.component';

describe('AddFamilleDangerComponent', () => {
  let component: AddFamilleDangerComponent;
  let fixture: ComponentFixture<AddFamilleDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFamilleDangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFamilleDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
