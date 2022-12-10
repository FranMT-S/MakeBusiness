import { Injectable } from '@angular/core';
import { Plan } from '../interfaces/plains';

import {environment} from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductHistory } from '../interfaces/product';
import { ClientResponse } from '../interfaces/response';





@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url = `${environment.baseUrl}/clients`

  constructor(private http:HttpClient) { }

  get getProductCarShopping():ProductHistory[]{
      let products:ProductHistory[] = [];
      let stringProduct:string = localStorage.getItem("products") ?? "[]"
      products = JSON.parse(stringProduct)
      return products;
  }

  addProductShopping(product:ProductHistory | Product | any){
    let products:ProductHistory[] | Product[]= this.getProductCarShopping;
    products.push(product)
    localStorage.setItem("products",JSON.stringify(products))
  }

  

  getClients():Observable<ClientResponse>{
    return this.http.get<ClientResponse>(`${this.url}`)
  }

  getClient(idUser:string):Observable<ClientResponse>{
    return this.http.get<ClientResponse>(`${this.url}/${idUser}`)
  }

  addProductHistory(idUser:string,product:ProductHistory):Observable<ClientResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    const data = {idProduct:product._id, ...product}
    
    return this.http.post<ClientResponse>(`${this.url}/${idUser}`,data,{headers})
  }

  
}
