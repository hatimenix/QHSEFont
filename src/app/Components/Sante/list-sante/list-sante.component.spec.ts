import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSanteComponent } from './list-sante.component';

describe('ListSanteComponent', () => {
  let component: ListSanteComponent;
  let fixture: ComponentFixture<ListSanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
