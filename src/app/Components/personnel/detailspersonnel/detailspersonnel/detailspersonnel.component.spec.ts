import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailspersonnelComponent } from './detailspersonnel.component';

describe('DetailspersonnelComponent', () => {
  let component: DetailspersonnelComponent;
  let fixture: ComponentFixture<DetailspersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailspersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailspersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
