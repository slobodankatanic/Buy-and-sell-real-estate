import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-advertiser-profile',
  templateUrl: './advertiser-profile.component.html',
  styleUrls: ['./advertiser-profile.component.css']
})
export class AdvertiserProfileComponent implements OnInit {

  constructor(private router: Router,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));

    if (!(this.user && (this.user.type == "owner" || this.user.type == "agent"))) {
      this.logout();
    } else {
      this.commonService.getAllAgencies()
        .subscribe((agencies: Agency[]) => {
          this.agencies = agencies;
          if (this.user.agencyId != "") {
            this.agencies.forEach(ag => {
              if (ag.pib == this.user.agencyId) {
                this.agency = ag;
                this.agencyId = this.agency.pib;
              }
            })
          } else {
            this.agencyId = "";
          }
        });
    }
  }

  user: User = null;
  agency: Agency = null;
  agencies: Agency[] = []
  agencyId: string = "";

  errorPhone: string = "";
  errorEmail: string = "";
  licenceError: string = "";

  oldEmail: string = ""
  oldPhone: string = ""
  oldLicence: string = ""

  editable: boolean = false;

  chooseAgency(event) {
    if (event.target.value == "") {
      this.agency = null;
      return;
    }

    for (let i = 0; i < this.agencies.length; i++) {
      if (this.agencies[i].pib == event.target.value) {
        this.agency = this.agencies[i];
        break;
      }
    }
  }

  editMode() {
    this.oldPhone = this.user.telephone;
    this.oldEmail = this.user.email;
    this.oldLicence = this.user.licence;
    this.editable = true;
  }

  cancel() {
    this.user.telephone = this.oldPhone;
    this.user.email = this.oldEmail;
    this.user.licence = this.oldLicence;
    this.agencyId = this.user.agencyId;

    if (this.user.agencyId == "") {
      this.agency = null;
    } else {
      for (let i = 0; i < this.agencies.length; i++) {
        if (this.agencies[i].pib == this.user.agencyId) {
          this.agency = this.agencies[i];
          break;
        }
      }
    }

    this.editable = false;
    this.errorEmail = "";
    this.errorPhone = "";
    this.licenceError = "";
    if (this.user.agencyId == "") {
      this.user.licence = ""
    }
  }

  saveEdit() {
    this.errorEmail = "";
    this.errorPhone = "";
    this.licenceError = "";

    if (this.agencyId == "") {
      this.user.licence = "";
    }

    if (this.user.licence == "" &&
      this.agencyId != "" &&
      this.user.type == "owner") {
      this.licenceError = "Required field";
      return;
    }

    if (this.user.telephone == this.oldPhone &&
      this.user.email == this.oldEmail &&
      this.user.agencyId == this.agencyId) {
      this.editable = false;
      return;
    }

    this.commonService.editAdvertiser(
      this.user.username,
      this.user.telephone,
      this.user.email,
      this.agencyId,
      this.user.licence).subscribe(resp => {
        if (resp['status'] == 0) {
          this.editable = false;
          this.commonService.getUserById(this.user.username)
            .subscribe((user: User) => {
              this.user = user;
              localStorage.setItem("user", JSON.stringify(user));
            })
        } else if (resp['status'] == 1) {
          this.errorPhone = resp['message'];
        } else {
          this.errorEmail = resp['message'];
        }
      })
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }
}
