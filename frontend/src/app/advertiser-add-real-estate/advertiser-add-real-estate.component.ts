import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { RealestateService } from '../services/realestate.service';

@Component({
  selector: 'app-advertiser-add-real-estate',
  templateUrl: './advertiser-add-real-estate.component.html',
  styleUrls: ['./advertiser-add-real-estate.component.css']
})
export class AdvertiserAddRealEstateComponent implements OnInit {

  constructor(private router: Router,
    private realEstateService: RealestateService) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (!(user && (user.type == "owner" || user.type == "agent"))) {
      this.logout();
    } else {

    }
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

}
