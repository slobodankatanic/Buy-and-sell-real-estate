import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiserProfileComponent } from './advertiser-profile.component';

describe('AdvertiserProfileComponent', () => {
  let component: AdvertiserProfileComponent;
  let fixture: ComponentFixture<AdvertiserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
