import { ThrowStmt } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Agency } from '../models/agency';
import { Characteristic } from '../models/characteristic';
import { RealEstate } from '../models/realestate';
import { User } from '../models/user';
import { CommonService } from '../services/common.service';
import { RealestateService } from '../services/realestate.service';
import { BuyerService } from '../services/buyer.service';

@Component({
  selector: 'app-realestate',
  templateUrl: './realestate.component.html',
  styleUrls: ['./realestate.component.css']
})
export class RealestateComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private realEstateService: RealestateService,
    private commonService: CommonService,
    private userService: BuyerService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (!(user && user.type == "buyer")) {
      this.logout();
    } else {
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.realEstateService.getById(this.id).subscribe((realEstate: RealEstate) => {
          this.realEstate = realEstate;

          if (realEstate.sold == 1) {
            this.router.navigate(['/'+ user.type +'/home']);
          }

          user.favorites.forEach(fav => {
            if (fav == this.realEstate.id) {
              this.inFavorites = true;
            }
          })

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

          this.commonService.getUserById(realEstate.advertiserId).subscribe((user: User) => {
            this.advertiser = user;
            if (user.type == "agent") {
              this.advertiserType = "agency";

              this.commonService.getAgencyById(user.agencyId).subscribe((agency: Agency) => {
                this.agency = agency;
              });
            } else {
              this.advertiserType = "owner";
            }
          })

        })
      });
    }
  }

  id: number;
  realEstate: RealEstate;
  characteristicsExists: string[] = []
  characteristicsDontExists: string[] = []

  advertiser: User;
  advertiserType: string;
  agency: Agency;

  inFavorites: boolean = false;

  showPhone: number = 0;

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  addToFavorites() {
    let user: User = JSON.parse(localStorage.getItem("user"));

    user.favorites.push(this.realEstate.id);
    this.userService.addToFavorites(user.username, this.realEstate.id).subscribe(resp => {
      this._snackBar.open(resp['message'] + "!", "Ok");
      this.inFavorites = true;
    });
  }

  showPhoneToggler() {
    if (this.showPhone == 1) {
      this.showPhone = 0;
    } else {
      this.showPhone = 1;
    }
  }

}
