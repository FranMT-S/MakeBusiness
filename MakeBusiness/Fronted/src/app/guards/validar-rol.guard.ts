import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Company } from '../interfaces/company';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { CompanyService } from '../services/company.service';


@Injectable({
  providedIn: 'root'
})
export class AdmingGuard  implements CanActivate,CanLoad,CanActivateChild{
  private usuario!:User;
  private company!:Company;

  constructor( private authService: AuthService,private companyService:CompanyService,
                 private router: Router ){
                this.usuario = this.authService.user;
    };
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
   
    if(this.usuario.type != "admin"){
      if(this.usuario.type == "company"){
        this.router.navigateByUrl(`/admin-companies/${localStorage.getItem("_web")!}`);
      }else{
        this.router.navigateByUrl('/auth/login');
      }
    }
      
    return true
  }

  canLoad(): boolean{
    if(this.usuario.type != "admin"){
      if(this.usuario.type == "company"){
        this.router.navigateByUrl(`/admin-companies/${localStorage.getItem("_web")!}`);
      }else{
        this.router.navigateByUrl('/auth/login');
      }
    }
      
    return true
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(this.usuario.type != "admin"){
      if(this.usuario.type == "company"){
        this.router.navigateByUrl(`/admin-companies/${localStorage.getItem("_web")!}`);
      }else{
        this.router.navigateByUrl('/auth/login');
      }
    }
      
    return true
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClientGuard  implements CanActivate,CanLoad,CanActivateChild{
  private usuario!:User;
  private company!:Company;

  constructor( private authService: AuthService,private companyService:CompanyService,
                 private router: Router ){
                this.usuario = this.authService.user;
    };
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
   
    if(this.usuario && this.usuario.type != "client"){
        this.router.navigateByUrl('/clients/companies');
    }
      
    return true
  }

  canLoad(): boolean{
    if(this.usuario && this.usuario.type != "client"){
      this.router.navigateByUrl('/clients/companies');
    }
    
    return true
 
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(this.usuario && this.usuario.type != "client"){
      this.router.navigateByUrl('/clients/companies');
    }
    
    return true
  }
}

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard  implements CanActivate,CanLoad,CanActivateChild{
  private usuario!:User;
  private company!:Company;

  constructor( private authService: AuthService, private companyService:CompanyService,
                 private router: Router ){
                this.usuario = this.authService.user;
    };
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    // localStorage.setItem("test",route.paramMap.get("id")) 

    const idParam = route.paramMap.get("id");
    
    if(this.usuario.type == "admin")
        this.router.navigateByUrl('/admin');
    else if(this.usuario.type == "company" && idParam != localStorage.getItem("_web"))
      this.router.navigateByUrl(`/admin-companies/${localStorage.getItem("_web")!}`);
    else if(this.usuario.type != "company")
      this.router.navigateByUrl('/auth/login');

    return true
  }

  canLoad(): boolean{
    
    if(this.usuario.type == "admin")
        this.router.navigateByUrl('/admin');
    else if(this.usuario.type != "company")
      this.router.navigateByUrl('/auth/login');
      
    return true
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    
    if(this.usuario.type == "admin")
        this.router.navigateByUrl('/admin');
    else if(this.usuario.type != "company")
      this.router.navigateByUrl('/auth/login');
      
    return true
  }
}