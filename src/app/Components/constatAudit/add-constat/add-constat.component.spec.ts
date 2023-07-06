import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConstatComponent } from './add-constat.component';

describe('AddConstatComponent', () => {
  let component: AddConstatComponent;
  let fixture: ComponentFixture<AddConstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConstatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
