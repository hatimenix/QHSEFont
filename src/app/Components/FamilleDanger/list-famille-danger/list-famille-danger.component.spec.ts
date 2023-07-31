import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFamilleDangerComponent } from './list-famille-danger.component';

describe('ListFamilleDangerComponent', () => {
  let component: ListFamilleDangerComponent;
  let fixture: ComponentFixture<ListFamilleDangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFamilleDangerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFamilleDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
