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

}
