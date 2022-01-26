import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllCities() {
    return this.httpClient.get(`${this.uri}/cities/getAll`);
  }

  getAllMunicipalities() {
    return this.httpClient.get(`${this.uri}/municipalities/getAll`);
  }

  getAllMicrolocations() {
    return this.httpClient.get(`${this.uri}/microlocations/getAll`);
  }

  getMunicipalitiesForCity(city) {
    return this.httpClient.get(`${this.uri}/municipalities/getForCity?city=${city}`);
  }

  getMicrolocationsForMunicipality(id) {
    return this.httpClient.get(`${this.uri}/microlocations/getForMunicipality?municipalityId=${id}`);
  }
}
