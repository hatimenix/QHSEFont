import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDangerComponent } from './add-danger.component';

describe('AddDangerComponent', () => {
  let component: AddDangerComponent;
  let fixture: ComponentFixture<AddDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
