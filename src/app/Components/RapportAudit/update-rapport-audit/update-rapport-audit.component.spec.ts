import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRapportAuditComponent } from './update-rapport-audit.component';

describe('UpdateRapportAuditComponent', () => {
  let component: UpdateRapportAuditComponent;
  let fixture: ComponentFixture<UpdateRapportAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRapportAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRapportAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
