import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  uri = 'http://localhost:4000';

  getUnergisteredUsers() {
    return this.httpClient.get(`${this.uri}/users/getUnregistered`);
  }

  getAllUsers() {
    return this.httpClient.get(`${this.uri}/users/getAll`);
  }

  acceptUser(username) {
    const data = {
      "username": username
    }

    return this.httpClient.post(`${this.uri}/users/accept`, data);
  }

  declineUser(username) {
    const data = {
      "username": username
    }

    return this.httpClient.post(`${this.uri}/users/decline`, data);
  }

  deleteUser(username) {
    const data = {
      "username": username
    }

    return this.httpClient.post(`${this.uri}/users/delete`, data);
  }

  editUser(username, phone, dob) {
    const data = {
      "username": username,
      "phone": phone,
      "dob": dob
    }

    return this.httpClient.post(`${this.uri}/users/update`, data);
  }

  addAgency(name, address, city, contact, pib) {
    const data = {
      "name": name,
      "pib": pib,
      "city": city,
      "address": address,
      "contact": contact
    }

    return this.httpClient.post(`${this.uri}/agency/add`, data);
  }

  addMicrolocation(name, addresses, municipality) {
    const data = {
      "name": name,
      "addresses": addresses,
      "municipality": municipality,
    }

    return this.httpClient.post(`${this.uri}/microlocations/add`, data);
  }

}
