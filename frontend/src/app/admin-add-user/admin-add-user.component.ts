import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar,
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router) {}

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.type != "admin") {
        this.router.navigate(['/'+ user.type +'/home']);
      } else {
        this.commonService.getAllAgencies().subscribe((agencies: Agency[]) => {
          this.agencies = agencies;
        })
      }
    } else {
      this.logout();
    }
  }

  agencies: Agency[] = []

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
  dateError: string = "";
  telephoneError: string = "";
  cityError: string = "";
  mailError: string = "";
  licenceError: string = "";
  imageError: string = "";

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
    this.agencyError = "";
    this.firstnameError = "";
    this.lastnameError = "";
    this.usernameError = "";
    this.passwordError = "";
    this.confirmPasswordError = "";
    this.dateError = "";
    this.telephoneError = "";
    this.cityError = "";
    this.mailError = "";
    this.licenceError = "";
    this.imageError = "";

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

    let phoneRegex = /^\+{0,1}381[0-9]{8,9}$/;

    if (!phoneRegex.test(this.telephone)) {
      this.telephoneError = "Wrong format";
      return;
    }

    let cityRegex = /^[A-Za-z]+(\s[A-Za-z]+)*$/;

    if (this.city == "") {
      this.cityError = "Required field";
      return
    } if (!cityRegex.test(this.city)) {
      this.cityError = "Only letters allowed";
      return
    }

    let regexMail = /^[A-Za-z0-9]+([\.]{0,1}[A-Za-z0-9_]+)*@[a-z]+(\.[a-z]{2,})*\.[a-z]{2,3}$/;

    if (!regexMail.test(this.email)) {
      this.mailError = "Wrong format";
      return;
    }

    if (this.dob == "") {
      this.dateError = "Required field";
      return;
    }

    let agencyName = "";

    if (this.agency == "Choose agency") {
      if (this.type == "agent") {
        this.agencyError = "You must choose agency";
        return;
      }
    } else {
      agencyName = this.agency;
    }

    if (this.type == "agent" && (this.licence == "" || this.licence == null)) {
      this.licenceError = "Required field";
      return;
    }

    if (this.profileImage == null) {
      this.imageError = "Image is required";
      return;
    }

    let imageNameRegexJpg = /\.jpg$/i;
    let imageNameRegexJpeg = /\.jpeg$/i;
    let imageNameRegexPng = /\.png$/i;

    if ((!imageNameRegexJpg.test(this.profileImage.name)) &&
        (!imageNameRegexJpeg.test(this.profileImage.name)) &&
        (!imageNameRegexPng.test(this.profileImage.name))) {
          this.imageError = "Image must be in jpg, jpeg or png format"
          return;
    }

    let img = new Image()

    img.src = window.URL.createObjectURL(this.profileImage)
    img.onload = () => {
      if (this.imageError == "") {
        if (img.height > 300 || img.width > 300) {
          this.imageError = "Max. image size is 300x300";
        } else if (img.height < 100 || img.width < 100) {
          this.imageError = "Min. image size is 100x100";
        } else {
          this.authService.register(
            "admin",
            this.firstname,
            this.lastname,
            this.username,
            this.password,
            this.city,
            this.dob,
            this.telephone,
            this.email,
            this.type,
            agencyName,
            this.licence,
            this.profileImage).subscribe(resp => {
              if (resp['status'] == 1) {
                this.usernameError = resp['message'];
              } else if (resp['status'] == 2) {
                this.mailError = resp['message'];
              } else if (resp['status'] == 0) {
                this.router.navigate(['/admin/editDeleteUser'])
                // this.formReset();
                // this._snackBar.open("Your registration request is sent successfully!", "Ok");
              }
            });
        }
      }
    }
  }

  profileImage: File = null;

  selectImage(event) {
    if (event.target.files.length == 1) {
      this.imageError = "";
      this.profileImage = event.target.files[0];
    }
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

}
