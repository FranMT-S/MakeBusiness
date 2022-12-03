import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, pipe, tap } from 'rxjs';

import {environment} from '../../environments/environment'
import { Company } from '../interfaces/company';
import { fileCompany } from '../interfaces/fileCompany';
import { Product } from '../interfaces/product';
import { webCompany } from '../interfaces/web';


interface CompanyResponse {
  ok:       boolean;
  companies: Company[];
  company:  Company;
  error: any;
  msg:string
}

interface ProductResponse {
  ok:       boolean;
  products: Product[];
  product:  Product;
  error: any;
  msg: string;
}

interface FileResponse {
  ok:       boolean;
  files: fileCompany[];
  file:  fileCompany;
  error: any;
  msg: string;
}



@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  private currentIDCompany:string = "";
  private currentCompany:Company = {} as Company;
  private currentWeb:webCompany = {} as webCompany;
  private currentProducts:Product[] = [];
  private currentFiles:fileCompany[] = [];
  private url = `${environment.baseUrl}/companies`
  private urlFile = `${environment.baseUrl}/files`
  private urlProducts = `${environment.baseUrl}/products`

  
  get getAllCompany():Observable<CompanyResponse>{
  
    return this.http.get<CompanyResponse>(this.url)
 
  }

  get getCompany():Company{
    return this.currentCompany;
  }

  set setCurrentCompany(company:Company){
    this.currentCompany = company;
  }

  get getCurrentIDCompany(){
    return this.currentIDCompany
  }

  set setCurrentIDCompany(id:string){
    this.currentIDCompany = id;
  }

  get getCurrentProducts():Product[]{
    return [...this.currentProducts];
  }

  set setCurrentProducts(products:Product[]){
    this.currentProducts = products;
  }

  get getCurrentFiles():fileCompany[]{
    return [...this.currentFiles];
  }

  set setCurrentFiles(filesCompany:fileCompany[]){
    this.currentFiles = filesCompany;
  }

  get getCurrentWeb():webCompany{
    return this.currentWeb;
  }

  set setCurrentWeb(webCompany:webCompany){
    this.currentWeb = webCompany;
  }


  getCompanyById(id:string):Observable<CompanyResponse>{
    return this.http.get<CompanyResponse>(`${this.url}/${id}`);
  }

    inicializatedCurrentData(idCompany:string){
    // Convertir a promsesa
    this.getCompanyById(idCompany).pipe(tap( res =>{
      this.currentCompany = res.company
    }))


  }

  getCompanyByUser(id:string):Observable<CompanyResponse>{
    return this.http.get<CompanyResponse>(`${this.url}/user/${id}`);
  }

  changeStateCompany(company:Company):Observable<CompanyResponse>{
    return this.http.put<CompanyResponse>(`${this.url}/${company._id}`,{state: !company.state})
  }


  deleteCompany(company:Company):Observable<CompanyResponse>{ 
    return this.http.delete<CompanyResponse>(`${this.url}/${company._id}`)
  }
 

  getCompanyProducts(idCompany:string):Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${this.urlProducts}/${idCompany}`)

  }

  getCompanyFiles(idCompany:string){
   
 }

  getProductById(idProduct:string){

   
 }

  getWebById(idWeb:string):any{

    let web = "";

    return web;
  }

}

