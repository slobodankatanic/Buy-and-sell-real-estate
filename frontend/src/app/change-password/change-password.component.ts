import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { FormControl, Validators } from '@angular/forms';

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

  oldPassword: string;
  newPassword: string;
  newPasswordReEntered: string;

  logout() {
    sessionStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  typeControl = new FormControl('', [this.validateInput]);

  validateInput() {
    return { 'phoneNumberInvalid': true };
  }

  getErrorMessage() {
    return 'Type is required field';
  }

  changePassword() {
    this.typeControl.setErrors({'incorrect': true});
  }

}
