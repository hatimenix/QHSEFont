import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDangerComponent } from './list-danger.component';

describe('ListDangerComponent', () => {
  let component: ListDangerComponent;
  let fixture: ComponentFixture<ListDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
