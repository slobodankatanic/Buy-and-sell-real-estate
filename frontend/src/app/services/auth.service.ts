import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user';

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

  changePassword(currentPass, newPass, confirmPass) {
    let user: User = JSON.parse(sessionStorage.getItem("user"));

    const data = {
      currentPassword: currentPass,
      newPassword: newPass,
      confirmPassword: confirmPass,
      username: user.username
    }

    return this.httpClient.post(`${this.uri}/users/changePassword`, data)
  }
}
