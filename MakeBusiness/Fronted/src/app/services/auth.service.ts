import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';


import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';

import { User } from '../interfaces/user';
import { AuthResponse, basicResponse, LoginResponse, registerClientSend, registerCompanySend } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl:string = environment.baseUrl;
  private _user!:User;


  /* Mínimo ocho caracteres, al menos una letra mayúscula, una minúscula y un número. */
  public passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  get user(){
    return {...this._user}
  }

  constructor(private http: HttpClient,
    private router: Router ) { }

  login( email:string, password:string ):Observable<boolean | string>{
    const url  = `${this._baseUrl}/login`
    const body = {email,password}
    return this.http.post<LoginResponse>( url, body)
      .pipe(
        tap(resp => {
          if(resp.ok === true){
            localStorage.setItem("token",resp.token!)
            const { ...data} = resp.data;
            this._user = data;
           
          }
        }),
        map( resp => {
          return resp.ok
        }),
        catchError( (err) =>{
          // console.log("CATCH",err.error)
          return of(err.error?.msg||"Error en la peticion")
        })
      )
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl("/auth/login")
  }

 

  registerCompany( companySend:registerCompanySend ){
    const url = `${this._baseUrl}/login/register/company`
    return this.http.post<basicResponse>(url,companySend)
  }

  registerClient( companySend:registerClientSend ){
    const url = `${this._baseUrl}/login/register/client`
    return this.http.post<basicResponse>(url,companySend)
  }

  validarToken():Observable<boolean> {

    const url = `${ this._baseUrl }/login/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>( url, { headers } )
      .pipe(
        map( resp => {
          if (localStorage.getItem('token') === null) {
            return false;
          }
          localStorage.setItem("token", resp.token!)
          const {...data} = resp.data;
          this._user = data;
          return resp.ok;
        }),
        catchError (err => of(false))
      );
  }

  validarNoToken():Observable<boolean> {

    const url = `${ this._baseUrl }/login/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>( url, { headers } )
      .pipe(
        map( resp => {
          if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
            return true;
          }else{
            localStorage.setItem("token", resp.token!)
            const {...data} = resp.data;
            this._user = data;
            return false;
          }
     
        }),
        catchError (err => of(true))
      );
  }


  getImageUrl() {
    return `${this._baseUrl}/uploads/users/${this.user.image}`;
  }


  

}
