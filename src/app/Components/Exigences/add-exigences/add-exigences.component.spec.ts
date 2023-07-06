import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExigencesComponent } from './add-exigences.component';

describe('AddExigencesComponent', () => {
  let component: AddExigencesComponent;
  let fixture: ComponentFixture<AddExigencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExigencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExigencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
