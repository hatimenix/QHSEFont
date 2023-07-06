import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnalyseSWOTComponent } from './list-analyse-swot.component';

describe('ListAnalyseSWOTComponent', () => {
  let component: ListAnalyseSWOTComponent;
  let fixture: ComponentFixture<ListAnalyseSWOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnalyseSWOTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAnalyseSWOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
