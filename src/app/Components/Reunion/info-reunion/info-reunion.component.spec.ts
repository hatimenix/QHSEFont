import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoReunionComponent } from './info-reunion.component';

describe('InfoReunionComponent', () => {
  let component: InfoReunionComponent;
  let fixture: ComponentFixture<InfoReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoReunionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
