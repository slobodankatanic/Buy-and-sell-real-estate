import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddMicrolocationComponent } from './admin-add-microlocation.component';

describe('AdminAddMicrolocationComponent', () => {
  let component: AdminAddMicrolocationComponent;
  let fixture: ComponentFixture<AdminAddMicrolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddMicrolocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddMicrolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
