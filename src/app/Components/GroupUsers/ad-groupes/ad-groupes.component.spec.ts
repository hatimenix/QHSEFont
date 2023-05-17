import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdGroupesComponent } from './ad-groupes.component';

describe('AdGroupesComponent', () => {
  let component: AdGroupesComponent;
  let fixture: ComponentFixture<AdGroupesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdGroupesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdGroupesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
