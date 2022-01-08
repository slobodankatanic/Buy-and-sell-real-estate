import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  uri = 'http://localhost:4000';

  login(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.httpClient.post(
      `${this.uri}/auth/login`,
      data,
      { observe: 'response' });
  }

  register(firstname, lastname, username, password, city,
    dateOfBirth, telephone, email, type, agency, licence) {

  }
}
