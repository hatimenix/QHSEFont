import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartieComponent } from './list-partie.component';

describe('ListPartieComponent', () => {
  let component: ListPartieComponent;
  let fixture: ComponentFixture<ListPartieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPartieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
