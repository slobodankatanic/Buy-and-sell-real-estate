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

  register(admin, firstname, lastname, username, password, city,
    dateOfBirth, telephone, email, type, agency, licence, image) {

    const formData = new FormData();

    formData.append("admin", admin);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("city", city);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("telephone", telephone);
    formData.append("email", email);
    formData.append("type", type);
    formData.append("agencyId", agency);
    formData.append("licence", licence);
    formData.append("image", image);

    return this.httpClient.post(`${this.uri}/auth/register`, formData);
  }

  changePassword(currentPass, newPass, confirmPass) {
    let user: User = JSON.parse(localStorage.getItem("user"));

    const data = {
      currentPassword: currentPass,
      newPassword: newPass,
      confirmPassword: confirmPass,
      username: user.username
    }

    return this.httpClient.post(`${this.uri}/users/changePassword`, data);
  }
}
