import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Characteristic } from '../models/characteristic';
import { City } from '../models/city';
import { Microlocation } from '../models/microlocation';
import { Municipality } from '../models/municipality';
import { RealEstate } from '../models/realestate';
import { User } from '../models/user';
import { CommonService } from '../services/common.service';
import { RealestateService } from '../services/realestate.service';

@Component({
  selector: 'app-advertiser-edit-real-estate',
  templateUrl: './advertiser-edit-real-estate.component.html',
  styleUrls: ['./advertiser-edit-real-estate.component.css']
})
export class AdvertiserEditRealEstateComponent implements OnInit {

  constructor(private router: Router,
    private realEstateService: RealestateService,
    private commonService: CommonService,
    private route: ActivatedRoute) { }

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

      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.realEstateService.getById(this.id).subscribe((realEstate: RealEstate) => {
          this.realEstate = realEstate;

          if (realEstate.sold == 1) {
            this.router.navigate(['/' + this.user.type + '/home']);
          }

          // fill the data
          this.name = realEstate.name;
          this.type = realEstate.type;
          this.price = realEstate.price + "";
          this.monthlyUtilities = realEstate.monthlyUtilities + "";
          this.transportLines = realEstate.transportLines;
          this.area = realEstate.area + "";
          this.floor = realEstate.floor + "";
          this.totalFloors = realEstate.totalFloors + "";
          this.rooms = realEstate.rooms + "";
          this.heating = realEstate.heating;
          this.constructionYear = realEstate.constructionYear + "";
          this.state = realEstate.state;
          this.description = realEstate.about;

          this.city = realEstate.cityId;
          this.citySelected();

          this.municipality = realEstate.municipalityId;
          this.municipalitySelected()

          this.microlocation = realEstate.microlocationId;
          this.microSelected();

          this.street = realEstate.street;
          if (realEstate.parking == "DA") {
            this.parking = true;
          }

          for (let i = 0; i < realEstate.characteristics.length; i++) {
            switch (realEstate.characteristics[i].name) {
              case "teracce":
                if (realEstate.characteristics[i].exists == 1) {
                  this.teracce = true;
                }
                break;
              case "basement":
                if (realEstate.characteristics[i].exists == 1) {
                  this.basement = true;
                }
                break;
              case "internet":
                if (realEstate.characteristics[i].exists == 1) {
                  this.internet = true;
                }
                break;
              case "loggia":
                if (realEstate.characteristics[i].exists == 1) {
                  this.loggia = true;
                }
                break;
              case "garage":
                if (realEstate.characteristics[i].exists == 1) {
                  this.garage = true;
                }
                break;
              case "interphone":
                if (realEstate.characteristics[i].exists == 1) {
                  this.interphone = true;
                }
                break;
              case "balcony":
                if (realEstate.characteristics[i].exists == 1) {
                  this.balcony = true;
                }
                break;
              case "garden":
                if (realEstate.characteristics[i].exists == 1) {
                  this.garden = true;
                }
                break;
              case "telephone":
                if (realEstate.characteristics[i].exists == 1) {
                  this.telephone = true;
                }
                break;
              case "elevator":
                if (realEstate.characteristics[i].exists == 1) {
                  this.elevator = true;
                }
                break;
              case "airConditioning":
                if (realEstate.characteristics[i].exists == 1) {
                  this.airConditioning = true;
                }
                break;
              case "air conditioning":
                if (realEstate.characteristics[i].exists == 1) {
                  this.airConditioning = true;
                }
                break;
            }
          }
        })
      });
    }
  }

  id: number = null;
  realEstate: RealEstate;

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

    this.realEstateService.editRealEstate(
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
      parkingExists,
      this.user.username,
      this.realEstate.id
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
