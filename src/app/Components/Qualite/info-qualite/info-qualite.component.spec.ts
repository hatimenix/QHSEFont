import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoQualiteComponent } from './info-qualite.component';

describe('InfoQualiteComponent', () => {
  let component: InfoQualiteComponent;
  let fixture: ComponentFixture<InfoQualiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoQualiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
