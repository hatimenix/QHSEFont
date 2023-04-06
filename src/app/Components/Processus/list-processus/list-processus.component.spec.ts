import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcessusComponent } from './list-processus.component';

describe('ListProcessusComponent', () => {
  let component: ListProcessusComponent;
  let fixture: ComponentFixture<ListProcessusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProcessusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProcessusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
