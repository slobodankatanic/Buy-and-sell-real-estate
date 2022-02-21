import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../models/city';
import { Microlocation } from '../models/microlocation';
import { Municipality } from '../models/municipality';
import { User } from '../models/user';
import { CommonService } from '../services/common.service';
import { RealestateService } from '../services/realestate.service';

@Component({
  selector: 'app-advertiser-add-real-estate',
  templateUrl: './advertiser-add-real-estate.component.html',
  styleUrls: ['./advertiser-add-real-estate.component.css']
})
export class AdvertiserAddRealEstateComponent implements OnInit {

  constructor(private router: Router,
    private realEstateService: RealestateService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (!(user && (user.type == "owner" || user.type == "agent"))) {
      this.logout();
    } else {
      this.commonService.getAllCities().subscribe((allCities: City[]) => {
        this.cities = allCities;
      })
    }
  }

  name: string = "";
  type: string = "";
  price: number = null;
  monthlyUtilities: number = null;
  transportLines: number[] = []
  area: number = null;
  floor: number = null;
  totalFloors: number = null;
  rooms: number = null;
  heating: string = "";
  constructionYear: number = null;
  state: string = "";
  description: string = "";

  city: number = null;
  municipality: number = null;
  microlocation: number = null;
  street: string = "";

  // characteristics
  teracce: boolean = false;
  basement: boolean = false;
  internet: boolean = false;
  loggia: boolean = false;
  garage: boolean = false;
  interphone: boolean = false;
  balcony: boolean = false;
  garden: boolean = false;
  telephone: boolean = false;
  elevator: boolean = false;
  airConditioning: boolean = false;

  cities: City[] = [];
  municipalities: Municipality[] = [];
  microlocations: Microlocation[] = []
  streets: string[] = []

  disabledMunicipality: boolean = true;
  disabledMicrolocation: boolean = true;
  disabledStreet: boolean = true;

  errorMessage: string = ""
  status: number = 0;

  citySelected() {
    this.municipality = null;
    this.disabledMunicipality = false;
    this.disabledMicrolocation = true;
    this.disabledStreet = true;
    this.street = "";

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
    this.microlocation = null;
    this.disabledStreet = true;
    this.street = "";

    this.commonService.getMicrolocationsForMunicipality(this.municipality).subscribe((micros: Microlocation[]) => {
      this.microlocations = micros;
    });
  }

  microSelected() {
    this.disabledStreet = false;
    this.street = "";
    this.microlocations.forEach(mloc => {
      if (mloc.id == this.microlocation) {
        this.streets = mloc.streets
      }
    })
  }

  addRealEstate() {
    this.errorMessage = ""
    this.status = 0;

    // images validation
    if (this.images.length < 3 || this.images.length > 6) {
      this.errorMessage = "You can select between 3 and 6 images"
      this.status = 13;
      return;
    } else {
      let imageNameRegexJpg = /\.jpg$/i;
      let imageNameRegexJpeg = /\.jpeg$/i;
      let imageNameRegexPng = /\.png$/i;

      this.images.forEach(img => {
        if ((!imageNameRegexJpg.test(img.name)) &&
          (!imageNameRegexJpeg.test(img.name)) &&
          (!imageNameRegexPng.test(img.name))) {
            this.errorMessage = "Images must be in jpg, jpeg or png format"
            this.status = 13;
        }
      })

      if (this.status == 13) {
        return;
      }
    }
  }

  images: File[] = []

  selectImages(event) {
    this.images = []

    if (event.target.files.length >= 1) {
      this.errorMessage = "";
      for (let i = 0; i < event.target.files.length; i++) {
        this.images.push(event.target.files[i])
      }
    } else {
      this.images = [];
    }

  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

}
