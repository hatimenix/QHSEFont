import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupesComponent } from './update-groupes.component';

describe('UpdateGroupesComponent', () => {
  let component: UpdateGroupesComponent;
  let fixture: ComponentFixture<UpdateGroupesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGroupesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGroupesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
