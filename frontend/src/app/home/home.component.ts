import { Component, OnInit } from '@angular/core';
import { RealEstate } from '../models/realestate';
import { RealestateService } from '../services/realestate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private realEstateService: RealestateService) { }

  ngOnInit(): void {
    this.realEstateService.getLatest().subscribe((realEstates: RealEstate[]) => {
      this.latestRealEstates = realEstates;
    })
  }

  latestRealEstates: RealEstate[] = [];

}
