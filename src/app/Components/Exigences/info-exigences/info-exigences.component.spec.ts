import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoExigencesComponent } from './info-exigences.component';

describe('InfoExigencesComponent', () => {
  let component: InfoExigencesComponent;
  let fixture: ComponentFixture<InfoExigencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoExigencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoExigencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
