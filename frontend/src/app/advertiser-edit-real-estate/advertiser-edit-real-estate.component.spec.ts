import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiserEditRealEstateComponent } from './advertiser-edit-real-estate.component';

describe('AdvertiserEditRealEstateComponent', () => {
  let component: AdvertiserEditRealEstateComponent;
  let fixture: ComponentFixture<AdvertiserEditRealEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiserEditRealEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiserEditRealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
