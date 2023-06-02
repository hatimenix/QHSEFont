import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypepartieComponent } from './add-typepartie.component';

describe('AddTypepartieComponent', () => {
  let component: AddTypepartieComponent;
  let fixture: ComponentFixture<AddTypepartieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypepartieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypepartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
