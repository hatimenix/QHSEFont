import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDangerComponent } from './info-danger.component';

describe('InfoDangerComponent', () => {
  let component: InfoDangerComponent;
  let fixture: ComponentFixture<InfoDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
