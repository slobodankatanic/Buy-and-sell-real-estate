import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../models/city';
import { User } from '../models/user';
import { FormControl, Validators } from '@angular/forms';
import { RealEstate } from '../models/realestate';
import { RealestateService } from '../services/realestate.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(private router: Router, private realEstateServce: RealestateService) { }

  cities: City[] = [
    {
      id: 1,
      name: "Sombor"
    },
    {
      id: 2,
      name: "Sankt Peterburg"
    }
  ];

  realEstates: RealEstate[] = [];
  noResultsMessage: string = "";

  ngOnInit(): void {
    let user: User = JSON.parse(sessionStorage.getItem("user"));

    if (!(user && user.type == "buyer")) {
      this.logout();
    } else {
      this.realEstateServce.getBasicSearchResult(this.type, this.city, this.municipality,
        this.microlocation, this.maxPrice, this.minArea, this.rooms)
          .subscribe((realEstates: RealEstate[]) => {
            if (realEstates && realEstates.length > 0) {
              this.realEstates = realEstates;
            } else {
              this.noResultsMessage = "No results";
            }
          })
    }
  }

  logout() {
    sessionStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  type: string = "";
  maxPrice: string = ""
  municipality: string = "";
  rooms: string = "";
  city: string = "";
  minArea: string = "";
  microlocation: string = "";

  disabledMunicipality: boolean = true;
  disabledMicrolocation: boolean = true;

  errorMessage: string = "";

  citySelected() {
    this.municipality = "";
    this.disabledMunicipality = false;
    this.disabledMicrolocation = true;
  }

  municipalitySelected() {
    this.disabledMicrolocation = false;
    this.microlocation = "";
  }

  search() {
    if (this.type == "") {
      this.typeControl.markAsTouched();
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
