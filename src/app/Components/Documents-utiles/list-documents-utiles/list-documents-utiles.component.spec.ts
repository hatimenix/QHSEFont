import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocumentsUtilesComponent } from './list-documents-utiles.component';

describe('ListDocumentsUtilesComponent', () => {
  let component: ListDocumentsUtilesComponent;
  let fixture: ComponentFixture<ListDocumentsUtilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDocumentsUtilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDocumentsUtilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
