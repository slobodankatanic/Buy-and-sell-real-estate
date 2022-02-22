import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiserAddJSONComponent } from './advertiser-add-json.component';

describe('AdvertiserAddJSONComponent', () => {
  let component: AdvertiserAddJSONComponent;
  let fixture: ComponentFixture<AdvertiserAddJSONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiserAddJSONComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiserAddJSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
