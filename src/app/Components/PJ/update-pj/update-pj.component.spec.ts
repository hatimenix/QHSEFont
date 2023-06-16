import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePjComponent } from './update-pj.component';

describe('UpdatePjComponent', () => {
  let component: UpdatePjComponent;
  let fixture: ComponentFixture<UpdatePjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
