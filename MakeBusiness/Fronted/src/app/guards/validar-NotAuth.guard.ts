import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CompanyService } from '../services/company.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarNotAuth implements CanActivate, CanLoad,CanActivateChild {

  constructor( private authService: AuthService,
               private companyService:CompanyService,
               private router: Router ){}


  canActivate(): Observable<boolean> | boolean{

    if (localStorage.getItem('token') === null) {
      return of(true);
    }

    return this.authService.validarNoToken()
      .pipe(
        tap( valid => {
          if(!valid){
            if(this.authService.user.type == 'client')
              this.router.navigateByUrl('/clients/companies');
            else if(this.authService.user.type == 'admin')
              this.router.navigateByUrl('/admin');
            else if(this.authService.user.type == 'company'){
              this.companyService.getCompanyByUser(this.authService.user._id).subscribe(res =>{
                if(res.ok)
                  this.router.navigateByUrl(`/admin-companies/${res.company._id}`);
                else
                  this.router.navigateByUrl('/auth/login');       
              })          
            }
            else 
              this.router.navigateByUrl('/auth/login');    
          }else{
            this.router.navigateByUrl('/auth/login');    
          }
        })
      );
  }
  canLoad(): Observable<boolean> | boolean{
    if (localStorage.getItem('token') === null) {
      return of(true);
    }

    return this.authService.validarNoToken()
      .pipe(
        tap( valid => {
          if(!valid){
            if(this.authService.user.type == 'client')
              this.router.navigateByUrl('/clients/companies');
            else if(this.authService.user.type == 'admin')
              this.router.navigateByUrl('/admin');
            else if(this.authService.user.type == 'company'){
              this.companyService.getCompanyByUser(this.authService.user._id).subscribe(res =>{
                if(res.ok)
                  this.router.navigateByUrl(`/admin-companies/${res.company._id}`);
                else
                  this.router.navigateByUrl('/auth/login');       
              })          
            }
            else 
              this.router.navigateByUrl('/auth/login');    
          }else{
            this.router.navigateByUrl('/auth/login');    
          }
        })
      );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.validarNoToken()
      .pipe(
        tap( valid => {
          if(!valid){
            if(this.authService.user.type == 'client')
              this.router.navigateByUrl('/clients/companies');
            else if(this.authService.user.type == 'admin')
              this.router.navigateByUrl('/admin');
            else if(this.authService.user.type == 'company'){
              this.companyService.getCompanyByUser(this.authService.user._id).subscribe(res =>{
                if(res.ok)
                  this.router.navigateByUrl(`/admin-companies/${res.company._id}`);
                else
                  this.router.navigateByUrl('/auth/login');       
              })          
            }
            else 
              this.router.navigateByUrl('/auth/login');    
          }
        })
      );
  }
}
