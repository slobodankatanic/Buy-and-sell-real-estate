import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AdminService } from '../services/admin-service.service';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    let user: User = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.type != "admin") {
        this.router.navigate(['/'+ user.type +'/home']);
      } else {
        this.adminService.getAllUsers().subscribe((users: User[]) => {
          this.allUsers = users;
          this.allUsers.forEach(user => {
            user.editable = false;
          })
        })
      }
    } else {
      this.logout();
    }
  }

  allUsers: User[] = [];

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"]);
  }

  delete(user) {
    this.adminService.deleteUser(user.username).subscribe(resp => {
      let index = this.allUsers.findIndex(
        item => item.username === user.username);
      this.allUsers.splice(index, 1);
    });
  }

  editMode: boolean = false;
  oldPhone: string = "";
  oldDOB: string = "";
  errorPhone: string = "";
  errorDOB: string = "";

  edit(user) {
    user.editable = true;
    this.editMode = true;
    this.oldPhone = user.telephone;
    this.oldDOB = user.dob;
  }

  cancel(user) {
    user.telephone = this.oldPhone;
    user.dob = this.oldDOB;
    user.editable = false;
    this.editMode = false;
    this.errorPhone = "";
    this.errorDOB = "";
  }

  saveEdit(user) {
    this.errorPhone = "";
    this.errorDOB = "";

    if (user.telephone == this.oldPhone && user.dob == this.oldDOB) {
      user.editable = false;
      this.editMode = false;
      return;
    }

    this.adminService.editUser(user.username,
      user.telephone, user.dob).subscribe({
        next: (response) => {
          user.editable = false;
          this.editMode = false;
        },
        error: (error) => {
          if (error.error['status'] == 1) {
            this.errorPhone = error.error['message'];
          } else {
            this.errorDOB = error.error['message'];
          }
        }
      })
  }

}
