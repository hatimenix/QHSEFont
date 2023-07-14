import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypepartiesComponent } from './list-typeparties.component';

describe('ListTypepartiesComponent', () => {
  let component: ListTypepartiesComponent;
  let fixture: ComponentFixture<ListTypepartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTypepartiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypepartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
