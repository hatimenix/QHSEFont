import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocumentationComponent } from './update-documentation.component';

describe('UpdateDocumentationComponent', () => {
  let component: UpdateDocumentationComponent;
  let fixture: ComponentFixture<UpdateDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDocumentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
