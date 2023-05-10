import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentsUtilesComponent } from './add-documents-utiles.component';

describe('AddDocumentsUtilesComponent', () => {
  let component: AddDocumentsUtilesComponent;
  let fixture: ComponentFixture<AddDocumentsUtilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDocumentsUtilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDocumentsUtilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
