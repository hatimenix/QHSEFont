import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartieComponent } from './add-partie.component';

describe('AddPartieComponent', () => {
  let component: AddPartieComponent;
  let fixture: ComponentFixture<AddPartieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
