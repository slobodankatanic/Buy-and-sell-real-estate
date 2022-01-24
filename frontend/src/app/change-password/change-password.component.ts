import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let user: User = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {
      this.logout();
    }
  }

  logout() {
    sessionStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

}
