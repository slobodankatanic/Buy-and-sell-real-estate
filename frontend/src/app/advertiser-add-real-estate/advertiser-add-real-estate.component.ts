import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Characteristic } from '../models/characteristic';
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
    this.user = JSON.parse(localStorage.getItem("user"));

    if (!(this.user && (this.user.type == "owner" || this.user.type == "agent"))) {
      this.logout();
    } else {
      this.commonService.getAllCities().subscribe((allCities: City[]) => {
        this.cities = allCities;
      })

      for (let i = 0; i < 17; i++) {
        this.formControl.push(new FormControl(''));
      }
    }
  }

  user: User = null;

  name: string = "";
  type: string = "";
  price: string = "";
  monthlyUtilities: string = "";
  transportLines: number[] = []
  area: string = "";
  floor: string = "";
  totalFloors: string = "";
  rooms: string = "";
  heating: string = "";
  constructionYear: string = "";
  state: string = "";
  description: string = "";

  city: number = 0;
  municipality: number = 0;
  microlocation: number = 0;
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

  parking: boolean = false;

  cities: City[] = [];
  municipalities: Municipality[] = [];
  microlocations: Microlocation[] = []
  streets: string[] = []

  disabledMunicipality: boolean = true;
  disabledMicrolocation: boolean = true;
  disabledStreet: boolean = true;

  errorMessage: string = ""
  status: number = 0;

  formControl = [];

  citySelected() {
    this.municipality = 0;
    this.municipalities = [];
    this.microlocations = [];
    this.streets = [];
    // this.disabledMunicipality = false;
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
    // this.disabledMicrolocation = false;
    this.microlocations = [];
    this.streets = [];
    this.microlocation = 0;
    this.disabledStreet = true;
    this.street = "";

    this.commonService.getMicrolocationsForMunicipality(this.municipality).subscribe((micros: Microlocation[]) => {
      this.microlocations = micros;
    });
  }

  microSelected() {
    // this.disabledStreet = false;
    this.streets = [];
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
      this.errorMessage = "You need to select between 3 and 6 images"
      this.status = 17;
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
          this.status = 17;
        }
      })

      if (this.status == 17) {
        return;
      }

      // add
      let parkingExists: string;
      if (this.parking == true) {
        parkingExists = "DA";
      } else {
        parkingExists = "NE";
      }

      let characteristics: Characteristic[] = []
      if (this.teracce) {
        characteristics.push({
          name: "terrace",
          exists: 1
        })
      } else {
        characteristics.push({
          name: "terrace",
          exists: 0
        })
      }
      if (this.basement) {
        characteristics.push({
          name: "basement",
          exists: 1
        })
      } else {
        characteristics.push({
          name: "basement",
          exists: 0
        })
      }
      if (this.internet) {
        characteristics.push({
          name: "internet",
          exists: 1
        })
      } else {
        characteristics.push({
          name: "internet",
          exists: 0
        })
      }
      if (this.loggia) {
        characteristics.push({
          name: "loggia",
          exists: 1
        })
      } else {
        characteristics.push({
          name: "loggia",
          exists: 0
        })
      }
      if (this.garage) {
        characteristics.push({
          name: "garage",
          exists: 1
        })
      } else {
        characteristics.push({
          name: "garage",
          exists: 0
        })
      }
      if (this.interphone) {
        characteristics.push({
          name: "interphone",
          exists: 1
        })
      } else {
        characteristics.push({
          name: "interphone",
          exists: 0
        })
      }
      if (this.balcony) {
        characteristics.push({
          name: "balcony",
          exists: 1
        })
      } else {
        characteristics.push({
          name: "balcony",
          exists: 0
        })
      }
      if (this.garden) {
        characteristics.push({
          name: "garden",
          exists: 1
        })
      } else {
        characteristics.push({
          name: "garden",
          exists: 0
        })
      }
      if (this.telephone) {
        characteristics.push({
          name: "telephone",
          exists: 1
        })
      } else {
        characteristics.push({
          name: "telephone",
          exists: 0
        })
      }
      if (this.elevator) {
        characteristics.push({
          name: "elevator",
          exists: 1
        })
      } else {
        characteristics.push({
          name: "elevator",
          exists: 0
        })
      }
      if (this.airConditioning) {
        characteristics.push({
          name: "airConditioning",
          exists: 1
        })
      } else {
        characteristics.push({
          name: "airConditioning",
          exists: 0
        })
      }

      let cityName;
      this.cities.forEach(cty => {
        if (cty.id == this.city) {
          cityName = cty.name;
        }
      })

      let munName;
      this.municipalities.forEach(mun => {
        if (mun.id == this.municipality) {
          munName = mun.name;
        }
      })

      let mlocName;
      this.microlocations.forEach(ml => {
        if (ml.id == this.microlocation) {
          mlocName = ml.name;
        }
      })

      if (this.price == null) {
        this.price = "";
      }
      if (this.monthlyUtilities == null) {
        this.monthlyUtilities = "";
      }
      if (this.area == null) {
        this.area = "";
      }
      if (this.rooms == null) {
        this.rooms = "";
      }
      if (this.floor == null) {
        this.floor = "";
      }
      if (this.totalFloors == null) {
        this.totalFloors = "";
      }
      if (this.constructionYear == null) {
        this.constructionYear = "";
      }

      this.realEstateService.addRealEstate(
        this.name,
        this.type,
        this.price,
        this.monthlyUtilities,
        this.area,
        this.rooms,
        this.floor,
        this.totalFloors,
        this.constructionYear,
        this.state,
        this.heating,
        this.transportLines,
        this.city,
        cityName,
        munName,
        this.street,
        this.municipality,
        mlocName,
        this.microlocation,
        this.description,
        JSON.stringify(characteristics),
        this.images,
        parkingExists,
        this.user.username
      ).subscribe(resp => {
        this.status = resp['status'];
        if (resp['status'] == 0) {
          this.router.navigate(['advertiser/home']);
        } else {
          this.errorMessage = resp['message'];
          this.formControl[this.status - 1].setErrors({ err: true });
          this.formControl[this.status - 1].markAsTouched();
          for (let i = 0; i < 17; i++) {
            if ((i + 1) != this.status) {
              this.formControl[i].setErrors(null);
            }
          }
        }
      })
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
