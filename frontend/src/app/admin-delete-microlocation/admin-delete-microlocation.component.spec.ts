import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteMicrolocationComponent } from './admin-delete-microlocation.component';

describe('AdminDeleteMicrolocationComponent', () => {
  let component: AdminDeleteMicrolocationComponent;
  let fixture: ComponentFixture<AdminDeleteMicrolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeleteMicrolocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteMicrolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
