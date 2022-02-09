import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private httpClient: HttpClient) { }

  uri = 'http://localhost:4000';

  addToFavorites(username, realEstatesId) {
    const data = {
      "username": username,
      "realEstateId": realEstatesId
    };

    return this.httpClient.post(`${this.uri}/users/addToFavorites`, data);
  }

  removeFromFavorites(username, realEstateId) {
    const data = {
      "username": username,
      "realEstateId": realEstateId
    };

    return this.httpClient.post(`${this.uri}/users/removeFromFavorites`, data);
  }

}
