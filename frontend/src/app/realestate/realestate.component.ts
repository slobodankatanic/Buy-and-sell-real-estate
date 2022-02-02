import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Characteristic } from '../models/characteristic';
import { RealEstate } from '../models/realestate';
import { User } from '../models/user';
import { RealestateService } from '../services/realestate.service';

@Component({
  selector: 'app-realestate',
  templateUrl: './realestate.component.html',
  styleUrls: ['./realestate.component.css']
})
export class RealestateComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private realEstateService: RealestateService) {}

  ngOnInit(): void {
    let user: User = JSON.parse(sessionStorage.getItem("user"));

    if (!(user && user.type == "buyer")) {
      this.logout();
    } else {
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.realEstateService.getById(this.id).subscribe((realEstate: RealEstate) => {
          this.realEstate = realEstate;

          this.realEstate.characteristics.forEach(charact => {
            if (charact.exists == 1) {
              this.characteristicsExists.push(charact.name);
            } else {
              this.characteristicsDontExists.push(charact.name);
            }
          });

          this.realEstateService.getAveragePrice("all", this.realEstate.microlocationId).subscribe(resp => {
            this.realEstate.averagePrice = Math.round(resp['averagePrice']);
          })

        })
      });
    }
  }

  id: number;
  realEstate: RealEstate;
  characteristicsExists: string[] = []
  characteristicsDontExists: string[] = []

  advertiser: string = "agency";

  logout() {
    sessionStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  addToFavorites() {

  }

}