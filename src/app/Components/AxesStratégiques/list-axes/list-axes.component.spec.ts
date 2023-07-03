import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAxesComponent } from './list-axes.component';

describe('ListAxesComponent', () => {
  let component: ListAxesComponent;
  let fixture: ComponentFixture<ListAxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAxesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
