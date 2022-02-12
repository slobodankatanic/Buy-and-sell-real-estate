import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-admin-add-agency',
  templateUrl: './admin-add-agency.component.html',
  styleUrls: ['./admin-add-agency.component.css']
})
export class AdminAddAgencyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.type != "admin") {
        this.router.navigate(['/'+ user.type +'/home']);
      } else {

      }
    } else {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

}
