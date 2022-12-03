import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs';



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {


  users:User[] = [];
  noImage:string = `${environment.baseUrl}/uploads/users/no-user-02.png`
  constructor(private router:Router,private userService:UserService) {
    this.getUsers()

   }

  ngOnInit(): void {

  }

  getUsers(){
    this.userService.getAllUsers.subscribe( res =>{
      if(res.ok){
        console.log()
        this.users = res.users;
        console.log(this.noImage)
      }
    })
  }

  editUser(user:User){
    this.router.navigate([`admin/users/${user._id}/edit-user`])
  }

  deleteUser(user:User){
      
    if (confirm("Desea eliminar el usuario " + user.userName)) {
     
      this.userService.deleteUser(user._id).subscribe( res =>{
        if(res.ok){
          this.getUsers();
        }else{
          alert("no se pudo eliminar el usuario")
          console.log(res.error)
        }
      });
    } 
  }
}
