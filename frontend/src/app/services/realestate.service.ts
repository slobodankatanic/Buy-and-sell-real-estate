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

  addRealEstate(
    name,
    type,
    price,
    monthlyUtilities,
    area,
    rooms,
    floor,
    totalFloors,
    constructionYear,
    state,
    heating,
    transportLines,
    cityId,
    city,
    municipality,
    street,
    municipalityId,
    microlocation,
    microlocationId,
    description,
    characteristics,
    images,
    parking,
    advertiser) {
    const formData = new FormData();

    formData.append("type", type);
    formData.append("name", name);
    formData.append("cityId", cityId);
    formData.append("municipalityId", municipalityId)
    formData.append("microlocationId", microlocationId);
    formData.append("city", city);
    formData.append("municipality", municipality);
    formData.append("microlocation", microlocation);
    formData.append("street", street);
    formData.append("area", area);
    formData.append("rooms", rooms);
    formData.append("constructionYear", constructionYear);
    formData.append("state", state);
    formData.append("heating", heating);
    formData.append("floor", floor);
    formData.append("totalFloors", totalFloors);
    formData.append("parking", parking);
    formData.append("monthlyUtilities", monthlyUtilities);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("transportLines", transportLines);
    formData.append("advertiser", advertiser);
    formData.append("characteristics", characteristics);
    images.forEach(img => formData.append("images", img));

    return this.httpClient.post(`${this.uri}/realestates/add`, formData);
  }

}
