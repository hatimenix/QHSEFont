import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConstatsComponent } from './list-constats.component';

describe('ListConstatsComponent', () => {
  let component: ListConstatsComponent;
  let fixture: ComponentFixture<ListConstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConstatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
