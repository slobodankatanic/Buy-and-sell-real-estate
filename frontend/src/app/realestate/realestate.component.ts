import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RealEstate } from '../models/realestate';

@Component({
  selector: 'app-realestate',
  templateUrl: './realestate.component.html',
  styleUrls: ['./realestate.component.css']
})
export class RealestateComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.id = params['id'];
      });
    }

  id: number;
  realEstate: RealEstate;

}
