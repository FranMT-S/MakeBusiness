import { Injectable } from '@angular/core';
import { ProductHistory } from '../interfaces/product';
import { Client, User } from '../interfaces/user';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
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
     return this.http.delete<UserResponse>(`${this.url}/${id}`)
  }

  newUser(user:User):Observable<UserResponse>{

    return this.http.post<UserResponse>(this.url,user)
 }

  updateUser(id:string,user:User):Observable<UserResponse>{
    return this.http.put<UserResponse>(`${this.url}/${id}`,user)
  }



}
