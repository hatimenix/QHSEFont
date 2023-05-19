import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCatographieComponent } from './list-catographie.component';

describe('ListCatographieComponent', () => {
  let component: ListCatographieComponent;
  let fixture: ComponentFixture<ListCatographieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCatographieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCatographieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
