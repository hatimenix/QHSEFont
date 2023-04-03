import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegistreTraitementComponent } from './list-registre-traitement.component';

describe('ListRegistreTraitementComponent', () => {
  let component: ListRegistreTraitementComponent;
  let fixture: ComponentFixture<ListRegistreTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRegistreTraitementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRegistreTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
