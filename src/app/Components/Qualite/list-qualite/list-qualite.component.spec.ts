import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQualiteComponent } from './list-qualite.component';

describe('ListQualiteComponent', () => {
  let component: ListQualiteComponent;
  let fixture: ComponentFixture<ListQualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQualiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
