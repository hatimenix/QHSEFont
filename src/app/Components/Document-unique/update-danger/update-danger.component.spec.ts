import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDangerComponent } from './update-danger.component';

describe('UpdateDangerComponent', () => {
  let component: UpdateDangerComponent;
  let fixture: ComponentFixture<UpdateDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
