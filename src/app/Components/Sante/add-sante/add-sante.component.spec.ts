import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSanteComponent } from './add-sante.component';

describe('AddSanteComponent', () => {
  let component: AddSanteComponent;
  let fixture: ComponentFixture<AddSanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
