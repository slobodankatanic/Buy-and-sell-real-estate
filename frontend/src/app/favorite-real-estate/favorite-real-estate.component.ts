import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-favorite-real-estate',
  templateUrl: './favorite-real-estate.component.html',
  styleUrls: ['./favorite-real-estate.component.css']
})
export class FavoriteRealEstateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

}
