import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRapportAuditComponent } from './list-rapport-audit.component';

describe('ListRapportAuditComponent', () => {
  let component: ListRapportAuditComponent;
  let fixture: ComponentFixture<ListRapportAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRapportAuditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRapportAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
