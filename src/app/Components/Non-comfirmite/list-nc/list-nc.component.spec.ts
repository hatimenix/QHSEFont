import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNcComponent } from './list-nc.component';

describe('ListNcComponent', () => {
  let component: ListNcComponent;
  let fixture: ComponentFixture<ListNcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
