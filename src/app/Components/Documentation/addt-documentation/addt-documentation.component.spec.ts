import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtDocumentationComponent } from './addt-documentation.component';

describe('AddtDocumentationComponent', () => {
  let component: AddtDocumentationComponent;
  let fixture: ComponentFixture<AddtDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtDocumentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
