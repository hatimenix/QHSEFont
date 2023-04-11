import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNcComponent } from './add-nc.component';

describe('AddNcComponent', () => {
  let component: AddNcComponent;
  let fixture: ComponentFixture<AddNcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
