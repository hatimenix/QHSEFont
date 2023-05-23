import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQualiteComponent } from './add-qualite.component';

describe('AddQualiteComponent', () => {
  let component: AddQualiteComponent;
  let fixture: ComponentFixture<AddQualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQualiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
