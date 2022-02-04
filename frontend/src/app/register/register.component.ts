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

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  type: string = "buyer";
  confirmPassword: string;
  city: string;
  dob: Date;
  email: string;
  telephone: string;
  agency: string = "Choose agency";
  licence: string = "";

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
    this.agency = "";
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
    this.agency = "";
    this.licence = "";
  }

  register() {
    // if (this.dob) {
    //   alert(this.dob)
    // }

    if (this.agency == "Choose agency") {
      this.agency = "";
    }

    this.authService.register(
      this.firstname,
      this.lastname,
      this.username,
      this.password,
      this.city,
      this.dob,
      this.telephone,
      this.email,
      this.type,
      this.agency,
      this.licence,
      this.profileImage).subscribe(resp => {
        // proveri status poruke - greske: email, username
      });
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
