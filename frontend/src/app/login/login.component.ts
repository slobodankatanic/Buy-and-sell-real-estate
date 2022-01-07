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
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.status == 200) {
          let user: User = <User> response.body;
          if (user.type == 0) {
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
