import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPartieComponent } from './info-partie.component';

describe('InfoPartieComponent', () => {
  let component: InfoPartieComponent;
  let fixture: ComponentFixture<InfoPartieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPartieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoPartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
