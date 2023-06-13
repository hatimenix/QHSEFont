import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPjComponent } from './list-pj.component';

describe('ListPjComponent', () => {
  let component: ListPjComponent;
  let fixture: ComponentFixture<ListPjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
