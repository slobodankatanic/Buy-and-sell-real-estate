import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AdminService } from '../services/admin-service.service';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.css']
})
export class AdminRequestComponent implements OnInit {

  constructor(private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (!(user && user.type == "admin")) {
      this.logout();
    } else {
      this.adminService.getUnergisteredUsers().subscribe((users: User[]) => {
        this.unregisteredUsers = users;
      })
    }
  }

  unregisteredUsers: User[] = [];

  accept(user) {
    this.adminService.acceptUser(user.username).subscribe(resp => {
      let index = this.unregisteredUsers.indexOf(user);
      this.unregisteredUsers.splice(index, 1);
    })
  }

  decline(user) {
    this.adminService.declineUser(user.username).subscribe(resp => {
      let index = this.unregisteredUsers.indexOf(user);
      this.unregisteredUsers.splice(index, 1);
    })
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }
}
