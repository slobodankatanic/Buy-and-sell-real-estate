import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealEstate } from '../models/realestate';
import { User } from '../models/user';
import { RealestateService } from '../services/realestate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private realEstateService: RealestateService) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.router.navigate([user.type + "/home"]);
    }

    this.realEstateService.getLatest().subscribe((realEstates: RealEstate[]) => {
      this.latestRealEstates = realEstates;

      this.latestRealEstates.forEach(re => {
        let ind = Math.floor(Math.random() * re.images.length);
        re.rndImg = re.images[ind];
      })
    })
  }

  latestRealEstates: RealEstate[] = [];

}
