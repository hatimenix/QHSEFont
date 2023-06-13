import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTachesComponent } from './info-taches.component';

describe('InfoTachesComponent', () => {
  let component: InfoTachesComponent;
  let fixture: ComponentFixture<InfoTachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTachesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
