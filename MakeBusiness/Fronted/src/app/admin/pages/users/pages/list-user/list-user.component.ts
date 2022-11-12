import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {


  users:User[] = [];
  constructor(private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getAllUsers;
  }

  editUser(user:User){
    this.router.navigate([`admin/users/${user.id}/edit-user`])
  }
}
