import { Component, Input, OnInit } from '@angular/core';
import { Agency } from '../models/agency';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private commonService: CommonService) {
    this.captcha = "";
  }

  captcha: string;

  firstname: string = "";
  lastname: string = "";
  username: string = "";
  password: string = "";
  type: string = "buyer";
  confirmPassword: string = "";
  city: string = "";
  dob: string = "";
  email: string = "";
  telephone: string = "";
  agency: string = "Choose agency";
  licence: string = "";

  agencyError: string = "";
  firstnameError: string = "";
  lastnameError: string = "";
  usernameError: string = "";
  passwordError: string = "";
  confirmPasswordError: string = "";

  ngOnInit(): void {
    this.commonService.getAllAgencies().subscribe((agencies: Agency[]) => {
      this.agencies = agencies;
    })
  }

  agencies: Agency[] = []

  ownerClicked() {
    (<HTMLInputElement>document.getElementById("agency")).disabled = true;
    (<HTMLInputElement>document.getElementById("licence")).disabled = true;
    this.type = "owner";
    this.agency = "Choose agency";
    this.licence = "";
  }

  agentClicked() {
    (<HTMLInputElement>document.getElementById("agency")).disabled = false;
    (<HTMLInputElement>document.getElementById("licence")).disabled = false;
    this.type = "agent";
  }

  buyerClicked() {
    (<HTMLInputElement>document.getElementById("agency")).disabled = true;
    (<HTMLInputElement>document.getElementById("licence")).disabled = true;
    this.type = "buyer";
    this.agency = "Choose agency";
    this.licence = "";
  }

  register() {
    // if (this.dob) {
    //   alert(this.dob)
    // }

    this.agencyError = "";
    this.firstnameError = "";
    this.lastnameError = "";
    this.usernameError = "";
    this.passwordError = "";
    this.confirmPasswordError = "";

    let regexName = new RegExp(/^[A-Za-z]{1,}$/);

    if (this.firstname == "") {
      this.firstnameError = "Required field";
      return;
    } else if (!regexName.test(this.firstname)) {
      this.firstnameError = "Only letters allowed";
      return;
    }

    if (this.lastname == "") {
      this.lastnameError = "Required field";
      return;
    } else if (!regexName.test(this.lastname)) {
      this.lastnameError = "Only letters allowed";
      return;
    }

    if (this.username == "") {
      this.usernameError = "Required field";
      return;
    }

    let regexSpecChars = new RegExp(/[@%+!#$^?:]/);
    let regexLength = new RegExp(/.{8,}/);
    let regexUpper = new RegExp(/[A-Z]/);
    let regexNumber = new RegExp(/[0-9]/);
    let regexStart = new RegExp(/^[A-Za-z]/);

    if (!regexSpecChars.test(this.password) ||
        !regexNumber.test(this.password) ||
        !regexUpper.test(this.password)) {
      this.passwordError = "Password must contain special character, upper letter and number";
      return;
    } else if (!regexLength.test(this.password)) {
      this.passwordError = "Min. password length is 8";
      return;
    } else if (!regexStart.test(this.password)) {
      this.passwordError = "Password must start with letter";
    }

    if (this.confirmPassword != this.password) {
      this.confirmPasswordError = "You must confirm password";
      return;
    }

    if (this.agency == "Choose agency") {
      if (this.type != "agent") {
        this.agency = "";
      } else {
        this.agencyError = "You must choose agency";
        return;
      }
    }

    // this.authService.register(
    //   this.firstname,
    //   this.lastname,
    //   this.username,
    //   this.password,
    //   this.city,
    //   this.dob,
    //   this.telephone,
    //   this.email,
    //   this.type,
    //   this.agency,
    //   this.licence,
    //   this.profileImage).subscribe(resp => {
    //     // proveri status poruke - greske: email, username
    //   });
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    if (this.captcha != "") {
      if (this.captcha != null) {
        (<HTMLInputElement>document.getElementById("register-button")).disabled = false;
      } else {
        (<HTMLInputElement>document.getElementById("register-button")).disabled = true;
      }
    }
  }

  profileImage: File = null;

  selectImage(event) {
    if (event.target.files.length == 1) {
      this.profileImage = event.target.files[0];
    }

    let img = new Image()

    img.src = window.URL.createObjectURL(this.profileImage)
    img.onload = () => {
      alert(img.width + " " + img.height + " " + this.profileImage.name);
    }
  }

}
