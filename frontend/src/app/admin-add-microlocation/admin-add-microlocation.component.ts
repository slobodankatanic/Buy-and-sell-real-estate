import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from '../models/city';
import { Municipality } from '../models/municipality';
import { User } from '../models/user';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-admin-add-microlocation',
  templateUrl: './admin-add-microlocation.component.html',
  styleUrls: ['./admin-add-microlocation.component.css']
})
export class AdminAddMicrolocationComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService) { }

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

  streetName: string = ""
  streetControl = new FormControl('')
  errorMessage: string = ""

  streets: string[] = []

  addStreet() {
    this.streets.push(this.streetName);
  }

}
