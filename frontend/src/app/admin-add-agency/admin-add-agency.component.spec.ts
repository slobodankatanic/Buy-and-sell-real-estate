import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAgencyComponent } from './admin-add-agency.component';

describe('AdminAddAgencyComponent', () => {
  let component: AdminAddAgencyComponent;
  let fixture: ComponentFixture<AdminAddAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddAgencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
