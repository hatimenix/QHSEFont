import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSourceComponent } from './list-source.component';

describe('ListSourceComponent', () => {
  let component: ListSourceComponent;
  let fixture: ComponentFixture<ListSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
