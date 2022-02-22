import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Characteristic } from '../models/characteristic';
import { City } from '../models/city';
import { Microlocation } from '../models/microlocation';
import { Municipality } from '../models/municipality';
import { User } from '../models/user';
import { CommonService } from '../services/common.service';
import { RealestateService } from '../services/realestate.service';

@Component({
  selector: 'app-advertiser-add-json',
  templateUrl: './advertiser-add-json.component.html',
  styleUrls: ['./advertiser-add-json.component.css']
})
export class AdvertiserAddJSONComponent implements OnInit {

  constructor(private router: Router,
    private commonService: CommonService,
    private realEstateService: RealestateService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));

    if (!(this.user && (this.user.type == "owner" || this.user.type == "agent"))) {
      this.logout();
    } else {

    }
  }

  user: User = null;

  state: number = 1;

  back() {
    this.router.navigate(['advertiser/addRealEstate']);
  }

  fileError: string = "";
  jsonFile: File = null;

  selectImage(event) {
    this.fileError = "";
    this.jsonFile = null;

    if (event.target.files.length == 1) {
      this.jsonFile = event.target.files[0];
    }
  }

  images: File[] = []

  selectImages(event) {
    this.images = []
    this.fileError = ""

    if (event.target.files.length >= 1) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.images.push(event.target.files[i])
      }
    } else {
      this.images = [];
    }
  }

  characteristics: Characteristic[] = []
  characteristicNames: string[] = ["terrace", "basement", "internet", "loggia", "garage",
    "interphone", "balcony", "garden", "telephone", "elevator", "air conditioning"]
  characteristicExists: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  name: string = "";//
  type: string = "";
  price: string = "";//
  monthlyUtilities: string = "";//
  transportLines: number[] = []
  area: string = "";//
  floor: string = "";//
  totalFloors: string = "";//
  rooms: string = "";//
  heating: string = "";//
  constructionYear: string = "";//
  reState: string = "";//
  description: string = "";//
  parking: string = "NE";//

  cityName: string = "";
  munName: string = "";
  mlocName: string = "";
  cityId: number = 0;
  munId: number = 0;
  mlocId: number = 0;
  street: string = "";

  toStep2() {
    if (this.state != 1) {
      return;
    }

    this.fileError = "";

    if (this.jsonFile == null) {
      this.fileError = "You must choose file";
      return;
    }

    let fileTypeRegex = /\.json$/i;
    if (!fileTypeRegex.test(this.jsonFile.name)) {
      this.fileError = "File must be in JSON format"
      return;
    }

    let fileReader: FileReader = new FileReader;

    fileReader.onload = () => {
      let fileContent = fileReader.result;
      let realEstate = JSON.parse(fileContent.toString())

      if ((typeof realEstate.Realestate) == "object") {
        if ((typeof realEstate.Realestate.Name) == "string" &&
          realEstate.Realestate.Name != "") {
          this.name = realEstate.Realestate.Name;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.Type) == "string" &&
          (realEstate.Realestate.Type == "kuca" ||
            realEstate.Realestate.Type == "stan" ||
            realEstate.Realestate.Type == "vikendica" ||
            realEstate.Realestate.Type == "lokal" ||
            realEstate.Realestate.Type == "magacin")) {
          this.type = realEstate.Realestate.Type;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.City) == "string") {
          this.cityName = realEstate.Realestate.City;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.Municipality) == "string") {
          this.munName = realEstate.Realestate.Municipality;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.Microlocation) == "string") {
          this.mlocName = realEstate.Realestate.Microlocation;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.Street) == "string" &&
          realEstate.Realestate.Street != "") {
          this.street = realEstate.Realestate.Street;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.Area) == "number") {
          this.area = realEstate.Realestate.Area;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.Rooms) == "number") {
          this.rooms = realEstate.Realestate.Rooms;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.ConstructionYear) == "number") {
          this.constructionYear = realEstate.Realestate.ConstructionYear;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.State) == "string" &&
          (realEstate.Realestate.State == "izvorno" ||
            realEstate.Realestate.State == "renovirano" ||
            realEstate.Realestate.State == "LUX")) {
          this.reState = realEstate.Realestate.State;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.Heating) == "string" &&
          (realEstate.Realestate.Heating == "centralno grejanje" ||
            realEstate.Realestate.Heating == "etazno grejanje" ||
            realEstate.Realestate.Heating == "TA pec" ||
            realEstate.Realestate.Heating == "toplotne pumpe")) {
          this.heating = realEstate.Realestate.Heating;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.Floor) == "number") {
          this.floor = realEstate.Realestate.Floor;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.TotalFloors) == "number") {
          this.totalFloors = realEstate.Realestate.TotalFloors;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.Parking) == "string" &&
          (realEstate.Realestate.Parking == "DA" ||
            realEstate.Realestate.Parking == "NE")) {
          this.parking = realEstate.Realestate.Parking;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.MonthlyUtilities) == "number") {
          this.monthlyUtilities = realEstate.Realestate.MonthlyUtilities;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.Price) == "number") {
          this.price = realEstate.Realestate.Price;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if ((typeof realEstate.Realestate.About) == "string") {
          this.description = realEstate.Realestate.About;
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        let charactArray: string[];
        if (realEstate.Realestate.Characteristics.constructor === Array) {
          charactArray = realEstate.Realestate.Characteristics;

          for (let i = 0; i < charactArray.length; i++) {
            if ((typeof charactArray[i]) == "string") {
              let index = this.characteristicNames.indexOf(charactArray[i].toLowerCase());
              if (index == -1) {
                this.fileError = "Wrong file content"
                return;
              } else {
                this.characteristicExists[index] = 1;
              }
            } else {
              this.fileError = "Wrong file content"
              return;
            }
          }

          for (let i = 0; i < this.characteristicExists.length; i++) {
            this.characteristics.push({
              name: this.characteristicNames[i],
              exists: this.characteristicExists[i]
            })
          }
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        if (realEstate.Realestate.TransportLines.constructor === Array) {
          for (let i = 0; i < realEstate.Realestate.TransportLines.length; i++) {
            if ((typeof realEstate.Realestate.TransportLines[i]) == "number") {
              this.transportLines.push(realEstate.Realestate.TransportLines[i]);
            } else {
              this.fileError = "Wrong file content"
              return;
            }
          }
        } else {
          this.fileError = "Wrong file content"
          return;
        }

        this.commonService.getMunicipalityByCityAndName(this.cityName, this.munName)
          .subscribe((mun: Municipality) => {
            if (mun) {
              this.munId = mun.id;

              this.commonService.getMicroloctionByMunAndName(mun.id, this.mlocName)
                .subscribe((mloc: Microlocation) => {
                  if (mloc) {
                    this.mlocId = mloc.id;

                    this.commonService.getAllCities().subscribe((cities: City[]) => {
                      for (let i = 0; i < cities.length; i++) {
                        if (cities[i].name == this.cityName) {
                          this.cityId = cities[i].id;
                          break;
                        }
                      }

                      this.state = 2;
                    })
                  } else {
                    this.fileError = "Wrong file content"
                    return;
                  }
                });
            } else {
              this.fileError = "Wrong file content"
              return;
            }
          });

      } else {
        this.fileError = "Wrong file content"
      }
    }

    fileReader.readAsText(this.jsonFile);
  }

  toStep3() {
    if (this.state != 2) {
      return;
    }

    if (this.images.length < 3 || this.images.length > 6) {
      this.fileError = "You need to select between 3 and 6 images"
      return;
    } else {
      let imageNameRegexJpg = /\.jpg$/i;
      let imageNameRegexJpeg = /\.jpeg$/i;
      let imageNameRegexPng = /\.png$/i;

      this.images.forEach(img => {
        if ((!imageNameRegexJpg.test(img.name)) &&
          (!imageNameRegexJpeg.test(img.name)) &&
          (!imageNameRegexPng.test(img.name))) {
          this.fileError = "Images must be in jpg, jpeg or png format"
        }
      })

      if (this.fileError != "") {
        return;
      }

      this.state = 3;
    }
  }

  addRealEstate() {
    if (this.state != 3) {
      return;
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
      this.reState,
      this.heating,
      this.transportLines,
      this.cityId,
      this.cityName,
      this.munName,
      this.street,
      this.munId,
      this.mlocName,
      this.mlocId,
      this.description,
      JSON.stringify(this.characteristics),
      this.images,
      this.parking,
      this.user.username
    ).subscribe(resp => {
      this.router.navigate(['advertiser/home']);
    });
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }
}
