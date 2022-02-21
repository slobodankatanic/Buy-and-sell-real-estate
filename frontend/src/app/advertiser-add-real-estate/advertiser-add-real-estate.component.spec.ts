import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiserAddRealEstateComponent } from './advertiser-add-real-estate.component';

describe('AdvertiserAddRealEstateComponent', () => {
  let component: AdvertiserAddRealEstateComponent;
  let fixture: ComponentFixture<AdvertiserAddRealEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiserAddRealEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiserAddRealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
