import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisSecteurComponent } from './lis-secteur.component';

describe('LisSecteurComponent', () => {
  let component: LisSecteurComponent;
  let fixture: ComponentFixture<LisSecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LisSecteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LisSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
