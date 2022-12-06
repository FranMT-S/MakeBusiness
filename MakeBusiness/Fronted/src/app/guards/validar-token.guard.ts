import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad,CanActivateChild {

  constructor( private authService: AuthService,
               private router: Router ){}


  canActivate(): Observable<boolean> | boolean{
    return this.authService.validarToken()
      .pipe(
        tap( valid => {
          if(!valid){
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }
  canLoad(): Observable<boolean> | boolean{
    return this.authService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.validarToken()
    .pipe(
      tap(valid => {
        if (!valid) {
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }
}
