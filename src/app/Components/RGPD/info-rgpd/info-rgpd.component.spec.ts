import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRGPDComponent } from './info-rgpd.component';

describe('InfoRGPDComponent', () => {
  let component: InfoRGPDComponent;
  let fixture: ComponentFixture<InfoRGPDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRGPDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRGPDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
