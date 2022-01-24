import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealestateService {

  constructor(private httpClient: HttpClient) { }

  uri: string = "http://localhost:4000";

  getBasicSearchResult(type, city, municipality, microlocation,
    maxPrice, minArea, minRooms) {
      const data = {
        type: type,
        city: city,
        municipality: municipality,
        microlocation: microlocation,
        maxPrice: maxPrice,
        minArea: minArea,
        minRooms: minRooms
      }

      return this.httpClient.post(`${this.uri}/realestates/getBasic`, data);
  }
}
