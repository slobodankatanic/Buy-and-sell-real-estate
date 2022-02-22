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
      if (this.user.agencyId != "") {
        this.commonService.getAgencyById(this.user.agencyId)
          .subscribe((agency: Agency) => {
            this.agency = agency;
          });
      }
    }
  }

  user: User = null;
  agency: Agency = null;

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }
}
