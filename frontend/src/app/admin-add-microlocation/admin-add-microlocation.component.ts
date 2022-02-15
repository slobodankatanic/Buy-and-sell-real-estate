import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '../models/city';
import { Municipality } from '../models/municipality';
import { User } from '../models/user';
import { AdminService } from '../services/admin-service.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-admin-add-microlocation',
  templateUrl: './admin-add-microlocation.component.html',
  styleUrls: ['./admin-add-microlocation.component.css']
})
export class AdminAddMicrolocationComponent implements OnInit {

  constructor(private router: Router,
    private commonService: CommonService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.type != "admin") {
        this.router.navigate(['/'+ user.type +'/home']);
      } else {
        this.commonService.getAllCities().subscribe((allCities: City[]) => {
          this.cities = allCities;
        })
      }
    } else {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  municipality: number = 0;
  city: number = 0;

  disabledMunicipality: boolean = true;

  cities: City[] = [];
  municipalities: Municipality[] = [];

  citySelected() {
    this.municipality = 0;
    this.disabledMunicipality = false;

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

  microlocationName: string = ""
  streetName: string = ""
  cityControl = new FormControl('')
  municipalityControl = new FormControl('')
  nameControl = new FormControl('')
  errorMessageCity: string = ""
  errorMessageMun: string = ""
  errorMessageName: string = ""

  streets: string[] = []

  addStreet() {
    if (this.streetName != "") {
      this.streets.push(this.streetName);
    }
    this.streetName = "";
  }

  removeAddress(address) {
    this.streets.splice(this.streets.indexOf(address), 1);
  }

  addMicrolocation() {
    if (this.microlocationName == "") {
      this.errorMessageName = "Required field";
      this.nameControl.setErrors({ name: true });
      this.nameControl.markAsTouched();
      this.cityControl.setErrors(null);
      this.municipalityControl.setErrors(null);
    } else if (this.city == 0) {
      this.errorMessageCity = "Required field";
      this.cityControl.setErrors({ city: true });
      this.cityControl.markAsTouched();
      this.municipalityControl.setErrors(null);
      this.nameControl.setErrors(null);
    } else if (this.municipality == 0) {
      this.errorMessageMun = "Required field";
      this.municipalityControl.setErrors({ municipality: true });
      this.municipalityControl.markAsTouched();
      this.cityControl.setErrors(null);
      this.nameControl.setErrors(null);
    } else {
      this.adminService.addMicrolocation(
        this.microlocationName,
        this.streets,
        this.municipality).subscribe(resp => {
          this.router.navigate(['/admin/microlocations'])
        })
    }
  }

}
