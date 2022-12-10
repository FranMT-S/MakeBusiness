import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs';
import Swal from 'sweetalert2'   
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {


  users:User[] = [];
  url:string = `${environment.baseUrl}/uploads/users/` 
  noImage:string = `${environment.baseUrl}/uploads/users/no-user-02.png`
  constructor(private router:Router,private userService:UserService,private authService:AuthService) {
    this.getUsers()

   }

  ngOnInit(): void {

  }

  getUsers(){
    this.userService.getAllUsers.subscribe( res =>{
      if(res.ok){
        this.users = res.users.filter(user => user._id != this.authService.user._id);
      }
    })
  }

  editUser(user:User){
    this.router.navigate([`admin/users/${user._id}/edit-user`])
  }

  deleteUser(user:User){
      
    Swal.fire({
      text: "¿Desea eliminar el usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user._id).subscribe( res =>{
          if(res.ok){
            this.getUsers();
          }
        },	({error}) =>{
          Swal.fire({ 
            background:'rgba(250,250,250,0.96)',
            title: 'Oops!! hubo un error',
            text: `${error.msg}`,                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
          console.log(error)
        });
      }
    })

     
     
     
  }
}
