import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, pipe, tap } from 'rxjs';

import {environment} from '../../environments/environment'
import { Company } from '../interfaces/company';
import { fileCompany, fileSend } from '../interfaces/fileCompany';
import { Product } from '../interfaces/product';
import { CompanyResponse, FileResponse, ProductResponse, WebResponse } from '../interfaces/response';
import { webCompany } from '../interfaces/web';




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

  get getCurrentIDCompany(){
    return this.currentIDCompany
  }

  set setCurrentIDCompany(id:string){
    this.currentIDCompany = id;
  }

  get getCompany():Company{
    return this.currentCompany;
  }

  set setCurrentCompany(company:Company){
    this.currentCompany = company;
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

  
  /* ========
     Star Files
     ========*/ 
  newFile(idCompany:string,file:fileSend):Observable<FileResponse>{ 
    const data:FormData = new FormData();
    
    data.append('baseName',String(file.baseName));
    data.append('file',file.file);
    data.append('description',file.description);
    
    return this.http.post<FileResponse>(`${this.urlFile}/${idCompany}`,data)
  }

  getFiles(idCompany:string):Observable<FileResponse>{ 
    return this.http.get<FileResponse>(`${this.urlFile}/${idCompany}`)
  }


  getFile(idCompany:string,idProduct:string):Observable<FileResponse>{ 
    return this.http.get<FileResponse>(`${this.urlFile}/${idCompany}/${idProduct}`)
  }

  updateFile(idCompany:string,idProduct:string, File:fileCompany):Observable<FileResponse>{ 
    return this.http.put<FileResponse>(`${this.urlFile}/${idCompany}/${idProduct}`,File)
  }

  deleteFile(idCompany:string,idProduct:string):Observable<FileResponse>{ 
    return this.http.delete<FileResponse>(`${this.urlFile}/${idCompany}/${idProduct}`)
  }

  // End Files ///

  addProduct(product:Product | any):Observable<ProductResponse>{
    const data:FormData = new FormData();
    
    data.append('name',product.name);
    data.append('price',product.price);
    data.append('description',product.description);
    data.append('categories',product.categories);
    data.append('image',product.image);

    return this.http.post<ProductResponse>(`${this.urlProducts}/${this.currentIDCompany}`,data)
  }


  deleteProduct(id:string):Observable<ProductResponse>{

    return this.http.delete<ProductResponse>(`${this.urlProducts}/${id}`)
  }

  updateProduct(idProduct:string,product:Product | any):Observable<ProductResponse>{
    const data:FormData = new FormData();
    
    if(product.name) data.append('name',product.name);
    if(product.price) data.append('price',product.price);
    if(product.description) data.append('description',product.description);
    if(product.categories) data.append('categories',product.categories);
    if(product.image) data.append('image',product.image);
    console.log("product:",product)
    console.log(data)
    console.log(`${this.urlProducts}/${this.getCurrentIDCompany}/${idProduct}`)
    return this.http.put<ProductResponse>(`${this.urlProducts}/${this.getCurrentIDCompany}/${idProduct}`,data)

  }

  getProductById(idProduct:string):Observable<ProductResponse>{
  
    return this.http.get<ProductResponse>(`${this.urlProducts}/${this.getCurrentIDCompany}/${idProduct}`)
  }

  getWeb(idCompany:string):Observable<WebResponse>{
    return this.http.get<WebResponse>(`${this.url}/${idCompany}/web`)
  }

  updateWeb(idCompany:string,web:webCompany | any):Observable<WebResponse>{

    const data:FormData = new FormData();
    
    if(web.title) data.append('title',web.title);
    if(web.keywords) data.append('keywords',web.keywords);
    if(web.cssExtra) data.append('cssExtra',web.cssExtra);
    if(web.jsExtra) data.append('jsExtra',web.jsExtra);
    if(web.genericHeaderHTML) data.append('genericHeaderHTML',web.genericHeaderHTML);
    if(web.genericFooterHTML) data.append('genericFooterHTML',web.genericFooterHTML);
    if(web.logo) data.append('logo',web.logo);
    if(web.favicon) data.append('favicon',web.favicon);

    return this.http.put<WebResponse>(`${this.url}/${idCompany}/web`,data)
  }

}

