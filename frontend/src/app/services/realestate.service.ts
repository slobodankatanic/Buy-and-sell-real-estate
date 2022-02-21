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

  getAveragePrice(type, microlocationId) {
    return this.httpClient.get(`${this.uri}/realestates/getAveragePrice?type=${type}&microlocation=${microlocationId}`);
  }

  getById(realEstateId) {
    return this.httpClient.get(`${this.uri}/realestates/get?id=${realEstateId}`);
  }

  getByAdvertiser(advertiserId) {
    return this.httpClient.get(`${this.uri}/realestates/getForAdvertiser?id=${advertiserId}`);
  }

  getLatest() {
    return this.httpClient.get(`${this.uri}/realestates/getLatest`);
  }

  getFavorites(username) {
    return this.httpClient.get(`${this.uri}/realestates/getFavorites?username=${username}`);
  }

  sellRealEstate(realEstateId) {
    const data = {
      "id": realEstateId
    }

    return this.httpClient.post(`${this.uri}/realestates/sell`, data);
  }

}
