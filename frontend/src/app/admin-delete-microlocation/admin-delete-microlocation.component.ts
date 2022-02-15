import { Component, OnInit } from '@angular/core';
import { Microlocation } from '../models/microlocation';
import { Municipality } from '../models/municipality';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-admin-delete-microlocation',
  templateUrl: './admin-delete-microlocation.component.html',
  styleUrls: ['./admin-delete-microlocation.component.css']
})
export class AdminDeleteMicrolocationComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
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

  allMicrolocations: Microlocation[] = []

  logout() {

  }

}
