import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSecteurComponent } from './update-secteur.component';

describe('UpdateSecteurComponent', () => {
  let component: UpdateSecteurComponent;
  let fixture: ComponentFixture<UpdateSecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSecteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
