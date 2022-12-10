import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user!:User;
  type = ""
  constructor(private router:Router,private authService:AuthService) { 

  }

  ngOnInit(): void {

    this.authService.validarToken().subscribe(valid =>{
      if(valid){
        this.user = this.authService.user;
        this.type = this.user.type;
      }else{
        localStorage.removeItem("products")
      }
    });

  }

  navegate(url:string){
    this.router.navigateByUrl(`clients/${url}`)
  }

  logOut(){
    this.authService.logOut();
  }

}
