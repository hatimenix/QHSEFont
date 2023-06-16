import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoConstatComponent } from './info-constat.component';

describe('InfoConstatComponent', () => {
  let component: InfoConstatComponent;
  let fixture: ComponentFixture<InfoConstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoConstatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoConstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
