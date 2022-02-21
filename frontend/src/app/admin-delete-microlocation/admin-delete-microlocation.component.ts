import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Microlocation } from '../models/microlocation';
import { Municipality } from '../models/municipality';
import { User } from '../models/user';
import { AdminService } from '../services/admin-service.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-admin-delete-microlocation',
  templateUrl: './admin-delete-microlocation.component.html',
  styleUrls: ['./admin-delete-microlocation.component.css']
})
export class AdminDeleteMicrolocationComponent implements OnInit {

  constructor(private commonService: CommonService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (!(user && user.type == "admin")) {
      this.logout();
    } else {
      this.commonService.getAllMicrolocations()
        .subscribe((mlocs: Microlocation[]) => {
          this.allMicrolocations = mlocs;
          this.allMicrolocations.forEach(mloc => {
            this.commonService.getMunicipalityById(mloc.municipality)
              .subscribe((mun: Municipality) => {
                mloc.municipalityName = mun.name;
                mloc.cityName = mun.city;
                // this.allMicrolocations.push(mloc);
              })
          })
        })
    }
  }

  allMicrolocations: Microlocation[] = []

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  delete(microlocationId) {
    this.adminService.deleteMicrolocation(microlocationId).subscribe(resp => {
      this.snackBar.open(resp['message'], "OK", {
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      if (resp['status'] == 0) {
        let index = this.allMicrolocations.findIndex(mloc => mloc.id == microlocationId)
        this.allMicrolocations.splice(index, 1)
      }
    })
  }

}
