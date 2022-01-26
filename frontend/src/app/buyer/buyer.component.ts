import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../models/city';
import { User } from '../models/user';
import { FormControl, Validators } from '@angular/forms';
import { RealEstate } from '../models/realestate';
import { RealestateService } from '../services/realestate.service';
import { CommonService } from '../services/common.service';
import { Microlocation } from '../models/microlocation';
import { Municipality } from '../models/municipality';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(private router: Router,
    private realEstateServce: RealestateService,
    private commonService: CommonService) { }

  cities: City[] = [];
  municipalities: Municipality[] = [];
  microlocations: Microlocation[] = []

  realEstates: RealEstate[] = [];
  noResultsMessage: string = "No results";

  ngOnInit(): void {
    let user: User = JSON.parse(sessionStorage.getItem("user"));

    if (!(user && user.type == "buyer")) {
      this.logout();
    } else {
      this.commonService.getAllCities().subscribe((allCities: City[]) => {
        this.cities = allCities;
      })
    }
  }

  logout() {
    sessionStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  type: string = "";
  maxPrice: number;
  municipality: number = 0;
  rooms: number;
  city: number = 0;
  minArea: number;
  microlocation: number = 0;

  disabledMunicipality: boolean = true;
  disabledMicrolocation: boolean = true;

  errorMessage: string = "";

  citySelected() {
    this.municipality = 0;
    this.disabledMunicipality = false;
    this.disabledMicrolocation = true;

    let name = '';
    this.cities.forEach(item => {
      if (item.id == this.city) {
        name = item.name;
      }
    })

    this.commonService.getMunicipalitiesForCity(name).subscribe((muns: Municipality[]) => {
      this.municipalities = muns;
    });
  }

  municipalitySelected() {
    this.disabledMicrolocation = false;
    this.microlocation = 0;

    this.commonService.getMicrolocationsForMunicipality(this.municipality).subscribe((micros: Microlocation[]) => {
      this.microlocations = micros;
    });
  }

  search() {
    if (this.type == "") {
      this.typeControl.markAsTouched();
    } else {
      this.realEstateServce.getBasicSearchResult(this.type, this.city, this.municipality,
        this.microlocation, this.maxPrice, this.minArea, this.rooms)
        .subscribe((realEstates: RealEstate[]) => {
          if (realEstates && realEstates.length > 0) {
            this.realEstates = realEstates;
            this.noResultsMessage = "";
          } else {
            this.noResultsMessage = "No results";
            this.realEstates = []
          }
        })
    }
  }

  typeControl = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.typeControl.hasError('required')) {
      return 'Type is required field';
    }
    return '';
  }

}
