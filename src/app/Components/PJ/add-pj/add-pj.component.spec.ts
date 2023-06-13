import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPjComponent } from './add-pj.component';

describe('AddPjComponent', () => {
  let component: AddPjComponent;
  let fixture: ComponentFixture<AddPjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
