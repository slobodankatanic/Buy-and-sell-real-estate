import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiserRealEstateListComponent } from './advertiser-real-estate-list.component';

describe('AdvertiserRealEstateListComponent', () => {
  let component: AdvertiserRealEstateListComponent;
  let fixture: ComponentFixture<AdvertiserRealEstateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiserRealEstateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiserRealEstateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
