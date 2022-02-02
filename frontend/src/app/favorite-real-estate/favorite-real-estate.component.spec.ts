import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRealEstateComponent } from './favorite-real-estate.component';

describe('FavoriteRealEstateComponent', () => {
  let component: FavoriteRealEstateComponent;
  let fixture: ComponentFixture<FavoriteRealEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteRealEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
