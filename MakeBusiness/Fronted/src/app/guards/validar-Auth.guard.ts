import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarAuthGuard implements CanActivate, CanLoad,CanActivateChild {

  constructor( private authService: AuthService,
               private router: Router ){}


  canActivate(): Observable<boolean> | boolean{
    return this.authService.validarToken()
    .pipe(
      tap(valid => {
        return true
      })
    );
  }
  canLoad(): Observable<boolean> | boolean{
    return this.authService.validarToken()
    .pipe(
      tap(valid => {
        return true
      })
  );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.validarToken()
      .pipe(
        tap(valid => {
          return true
        })
    );
  }
}
