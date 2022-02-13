import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AdminService } from '../services/admin-service.service';

@Component({
  selector: 'app-admin-add-agency',
  templateUrl: './admin-add-agency.component.html',
  styleUrls: ['./admin-add-agency.component.css']
})
export class AdminAddAgencyComponent implements OnInit {

  constructor(private router: Router,
    private adminService: AdminService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.type != "admin") {
        this.router.navigate(['/' + user.type + '/home']);
      } else {

      }
    } else {
      this.logout();
    }
  }

  agencyName: string = "";
  agencyAddress: string = "";
  agencyCity: string = "";
  agencyContact: string = "";
  agencyPib: string = "";

  errorMessage: string = "";

  agencyNameControl = new FormControl('');
  agencyPibControl = new FormControl('');
  agencyAddressControl = new FormControl('');
  agencyCityControl = new FormControl('');
  agencyContactControl = new FormControl('');

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  addAgency() {
    this.errorMessage = "";

    this.adminService.addAgency(this.agencyName,
      this.agencyAddress,
      this.agencyCity,
      this.agencyContact,
      this.agencyPib).subscribe(resp => {
        if (resp['status'] == 0) {
          this._snackBar.open(resp['message'], "Ok");

          this.agencyName = "";
          this.agencyPib = "";
          this.agencyCity = "";
          this.agencyContact = "";
          this.agencyAddress = "";
        } else if (resp['status'] == 1) {
          this.errorMessage = resp['message'];

          this.agencyNameControl.setErrors({ agencyName: true });
          this.agencyNameControl.markAsTouched();

          this.agencyAddressControl.setErrors(null);
          this.agencyCityControl.setErrors(null);
          this.agencyPibControl.setErrors(null);
          this.agencyContactControl.setErrors(null);
        } else if (resp['status'] == 2) {
          this.errorMessage = resp['message'];

          this.agencyPibControl.setErrors({ agencyPib: true });
          this.agencyPibControl.markAsTouched();

          this.agencyAddressControl.setErrors(null);
          this.agencyCityControl.setErrors(null);
          this.agencyNameControl.setErrors(null);
          this.agencyContactControl.setErrors(null);
        } else if (resp['status'] == 3) {
          this.errorMessage = resp['message'];

          this.agencyCityControl.setErrors({ agencyCity: true });
          this.agencyCityControl.markAsTouched();

          this.agencyAddressControl.setErrors(null);
          this.agencyPibControl.setErrors(null);
          this.agencyNameControl.setErrors(null);
          this.agencyContactControl.setErrors(null);
        } else if (resp['status'] == 4) {
          this.errorMessage = resp['message'];

          this.agencyAddressControl.setErrors({ agencyAddress: true });
          this.agencyAddressControl.markAsTouched();

          this.agencyCityControl.setErrors(null);
          this.agencyPibControl.setErrors(null);
          this.agencyNameControl.setErrors(null);
          this.agencyContactControl.setErrors(null);
        } else if (resp['status'] == 5) {
          this.errorMessage = resp['message'];

          this.agencyContactControl.setErrors({ agencyContact: true });
          this.agencyContactControl.markAsTouched();

          this.agencyCityControl.setErrors(null);
          this.agencyPibControl.setErrors(null);
          this.agencyNameControl.setErrors(null);
          this.agencyAddressControl.setErrors(null);
        }
      })
  }
}
