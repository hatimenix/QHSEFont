import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFicheComponent } from './add-fiche.component';

describe('AddFicheComponent', () => {
  let component: AddFicheComponent;
  let fixture: ComponentFixture<AddFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFicheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
