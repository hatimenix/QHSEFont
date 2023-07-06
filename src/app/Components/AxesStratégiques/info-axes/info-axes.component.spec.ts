import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAxesComponent } from './info-axes.component';

describe('InfoAxesComponent', () => {
  let component: InfoAxesComponent;
  let fixture: ComponentFixture<InfoAxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAxesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoAxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
