import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRapportAuditComponent } from './add-rapport-audit.component';

describe('AddRapportAuditComponent', () => {
  let component: AddRapportAuditComponent;
  let fixture: ComponentFixture<AddRapportAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRapportAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRapportAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
