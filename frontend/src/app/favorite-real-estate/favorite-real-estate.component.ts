import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RealEstate } from '../models/realestate';
import { User } from '../models/user';
import { BuyerService } from '../services/buyer.service';
import { CommonService } from '../services/common.service';
import { RealestateService } from '../services/realestate.service';

@Component({
  selector: 'app-favorite-real-estate',
  templateUrl: './favorite-real-estate.component.html',
  styleUrls: ['./favorite-real-estate.component.css']
})
export class FavoriteRealEstateComponent implements OnInit {

  constructor(private router: Router,
    private commonService: CommonService,
    private realEstateService: RealestateService,
    private buyerService: BuyerService,
    private _snackBar: MatSnackBar) { }

  favoriteRealEstates: RealEstate[] = [];

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      this.logout();
      return;
    } else if (user.type != "buyer") {
      this.router.navigate(['/'+ user.type +'/home']);
    }

    this.commonService.getUserById(user.username).subscribe((usr: User) => {
      localStorage.setItem("user", JSON.stringify(usr));
      this.realEstateService.getFavorites(user.username).subscribe((re: RealEstate[]) => {
        this.favoriteRealEstates = re;
      })
    })
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  removeFromFavorites(id) {
    let user: User = JSON.parse(localStorage.getItem("user"));
    this.buyerService.removeFromFavorites(user.username, id).subscribe(resp => {
      this.commonService.getUserById(user.username).subscribe((usr: User) => {
        localStorage.setItem("user", JSON.stringify(usr));
        this.realEstateService.getFavorites(user.username).subscribe((re: RealEstate[]) => {
          this.favoriteRealEstates = re;
        })
      })

      this._snackBar.open(resp['message'], "Ok");
    });
  }

}
