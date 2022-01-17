import { Component, OnInit } from '@angular/core';
import { City } from '../models/city';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor() { }

  cities: City[] = [
    {
      id: 1,
      name: "Sombor"
    },
    {
      id: 2,
      name: "Loznica"
    }
  ];

  ngOnInit(): void {
  }

}
