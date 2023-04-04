import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEvenementComponent } from './info-evenement.component';

describe('InfoEvenementComponent', () => {
  let component: InfoEvenementComponent;
  let fixture: ComponentFixture<InfoEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEvenementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
