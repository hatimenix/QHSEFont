import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartographieRisquesComponent } from './cartographie-risques.component';

describe('CartographieRisquesComponent', () => {
  let component: CartographieRisquesComponent;
  let fixture: ComponentFixture<CartographieRisquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartographieRisquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartographieRisquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
