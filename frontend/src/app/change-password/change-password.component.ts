import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      this.logout();
    }
  }

  oldPassword: string;
  newPassword: string;
  newPasswordReEntered: string;

  errorMessage: string = "";
  status: number = -1;

  currPassControl = new FormControl('');
  newPassControl = new FormControl('');
  confPassControl = new FormControl('');

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  changePassword() {
    let regexSpecChars = new RegExp(/[@%+!#$^?:]/);
    let regexLength = new RegExp(/.{8,}/);
    let regexUpper = new RegExp(/[A-Z]/);
    let regexNumber = new RegExp(/[0-9]/);
    let regexStart = new RegExp(/^[A-Za-z]/);

    if (!regexSpecChars.test(this.newPassword) ||
        !regexNumber.test(this.newPassword) ||
        !regexUpper.test(this.newPassword)) {
      this.errorMessage = "Password must contain at least one sepcial character, one uppercase letter and one number";
      this.newPassControl.setErrors({ invNew: true });
      this.newPassControl.markAsTouched();

      this.currPassControl.setErrors(null);
      this.confPassControl.setErrors(null);

    } else if (!regexLength.test(this.newPassword)) {
      this.errorMessage = "Min. password length is 8";
      this.newPassControl.setErrors({ invNew: true });
      this.newPassControl.markAsTouched();

      this.currPassControl.setErrors(null);
      this.confPassControl.setErrors(null);

    } else if (!regexStart.test(this.newPassword)) {
      this.errorMessage = "Password must start with letter";
      this.newPassControl.setErrors({ invNew: true });
      this.newPassControl.markAsTouched();

      this.currPassControl.setErrors(null);
      this.confPassControl.setErrors(null);

    } else {
      this.authService.changePassword(this.oldPassword,
        this.newPassword,
        this.newPasswordReEntered).subscribe(resp => {
          this.status = resp['status'];

          if (this.status > 0) {
            this.errorMessage = resp['msg'];

            if (this.status == 3) {
              this.currPassControl.setErrors({ invCurr: true });
              this.currPassControl.markAsTouched();

              this.newPassControl.setErrors(null);
              this.confPassControl.setErrors(null);

            } else if (this.status == 2) {
              this.confPassControl.setErrors({ invConf: true });
              this.confPassControl.markAsTouched();

              this.newPassControl.setErrors(null);
              this.currPassControl.setErrors(null);

            } else if (this.status == 1) {
              this.newPassControl.setErrors({ invNew: true });
              this.newPassControl.markAsTouched();

              this.currPassControl.setErrors(null);
              this.confPassControl.setErrors(null);
            }

          } else {
            this.logout();
          }
        });
    }
  }

}
