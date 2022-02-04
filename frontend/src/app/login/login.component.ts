import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  username: string;
  password: string;

  message: string;

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.router.navigate([user.type + "/home"]);
    }
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.status == 200) {
          let user: User = <User> response.body;

          localStorage.setItem("user", JSON.stringify(user));

          if (user.type == "buyer") {
            this.router.navigate(['/buyer/home'])
          } else {

          }
        } else {
          this.message = "Error";
        }
      },
      error: (error) => {
        this.message = error.error["message"];
        // document.getElementById("username").classList.add("is-invalid");
      }
    });
  }

}
