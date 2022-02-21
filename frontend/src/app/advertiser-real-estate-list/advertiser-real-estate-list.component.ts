import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../models/realestate';
import { User } from '../models/user';
import { RealestateService } from '../services/realestate.service';

@Component({
  selector: 'app-advertiser-real-estate-list',
  templateUrl: './advertiser-real-estate-list.component.html',
  styleUrls: ['./advertiser-real-estate-list.component.css']
})
export class AdvertiserRealEstateListComponent implements OnInit {

  constructor(private router: Router,
    private realEstateService: RealestateService) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (!(user && (user.type == "owner" || user.type == "agent"))) {
      this.logout();
    } else {
      this.realEstateService.getByAdvertiser(user.username).subscribe((allRe: RealEstate[]) => {
        this.allRealEstates = allRe;
      })
    }
  }

  allRealEstates: RealEstate[] = []

  sellRealEstate(realEstate) {
    this.realEstateService.sellRealEstate(realEstate.id).subscribe(resp => {
      if (resp['status'] == 0) {
        realEstate.sold = 1;
      }
    })
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

}
