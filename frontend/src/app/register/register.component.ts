import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) {
    this.captcha = "";
  }

  captcha: string;

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirmPassword: string;
  city: string;
  dob: Date;
  email: string;
  telephone: string;
  agency: string = "Choose agency";
  licence: string;

  ngOnInit(): void {
  }

  agentClicked() {
    (<HTMLInputElement>document.getElementById("agency")).disabled = false;
    (<HTMLInputElement>document.getElementById("licence")).disabled = false;
  }

  buyerClicked() {
    (<HTMLInputElement>document.getElementById("agency")).disabled = true;
    (<HTMLInputElement>document.getElementById("licence")).disabled = true;
  }

  register() {
    if (this.dob) {
      alert(this.dob)
    }
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    if (this.captcha != "") {
      (<HTMLInputElement>document.getElementById("register-button")).disabled = false;
    }
  }

}
