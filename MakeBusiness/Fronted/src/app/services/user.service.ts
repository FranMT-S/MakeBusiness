import { Injectable } from '@angular/core';
import { ProductHistory } from '../interfaces/product';
import { Client, User } from '../interfaces/user';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserResponse {
  ok:       boolean;
  users: User[];
  user:  User;
  error: any;
  msg: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.baseUrl}/users`
  constructor(private http:HttpClient) { }

  get getAllUsers():Observable<UserResponse>{
       return this.http.get<UserResponse>(this.url)
  }

  getUser(id:string):Observable<UserResponse>{

    return this.http.get<UserResponse>(`${this.url}/${id}`)
    
  }
  
  deleteUser(id:string):Observable<UserResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
     return this.http.delete<UserResponse>(`${this.url}/${id}`,{headers})
  }

  newUser(user:User):Observable<UserResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    return this.http.post<UserResponse>(this.url,user,{headers})
 }

  updateUser(id:string,user:User | any):Observable<UserResponse>{
    const data:FormData = new FormData();

    if(user.userName) data.append('userName',user.userName);
    if(user.email) data.append('email',user.email);
    if(user.password) data.append('password',user.password);
    if(user.image) data.append('image',user.image);

    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    return this.http.put<UserResponse>(`${this.url}/${id}`,data,{headers})
  }



}
