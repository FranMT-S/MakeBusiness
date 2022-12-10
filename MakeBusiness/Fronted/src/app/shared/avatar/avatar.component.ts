import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  url = `${environment.baseUrl}/uploads/users/`
  user!:User;
  constructor(private authService:AuthService,private router:Router) {
 
 
  

   }

  ngAfterContentInit(): void {
  
    
  }
  ngOnInit(): void {
    this.authService.validarToken().subscribe( valid =>{
      this.user = this.authService.user;
      this.url +=  this.user.image || "";
    })
  }

  navigated(){
    this.router.navigateByUrl('edit-profile')
  }

  logOut(){
    this.authService.logOut();
  }

}
