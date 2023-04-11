import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoNcComponent } from './info-nc.component';

describe('InfoNcComponent', () => {
  let component: InfoNcComponent;
  let fixture: ComponentFixture<InfoNcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoNcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoNcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
