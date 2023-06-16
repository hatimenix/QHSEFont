import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExigencesComponent } from './list-exigences.component';

describe('ListExigencesComponent', () => {
  let component: ListExigencesComponent;
  let fixture: ComponentFixture<ListExigencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExigencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExigencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
