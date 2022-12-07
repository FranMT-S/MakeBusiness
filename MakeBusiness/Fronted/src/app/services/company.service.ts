import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, pipe, tap } from 'rxjs';

import {environment} from '../../environments/environment'
import { Company } from '../interfaces/company';
import { fileCompany, fileSend } from '../interfaces/fileCompany';
import { Block, pageCompany } from '../interfaces/page';
import { Product } from '../interfaces/product';
import { BlockResponse, CompanyResponse, FileResponse, PageResponse, ProductResponse, WebResponse } from '../interfaces/response';
import { webCompany } from '../interfaces/web';




@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  private currentIDCompany:string = "";
  private currentCompany:Company = {} as Company;
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
    
    this.getCompanyById(idCompany).pipe(tap( res =>{
      this.currentCompany = res.company
    }))


  }

  getCompanyByUser(id:string):Observable<CompanyResponse>{
    return this.http.get<CompanyResponse>(`${this.url}/user/${id}`);
  }

  changeStateCompany(company:Company):Observable<CompanyResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')

    return this.http.put<CompanyResponse>(`${this.url}/${company._id}`,{state: !company.state},{headers})
  }


  deleteCompany(company:Company):Observable<CompanyResponse>{ 
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    return this.http.delete<CompanyResponse>(`${this.url}/${company._id}`,{headers})
  }
 

  getCompanyProducts(idCompany:string):Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${this.urlProducts}/${idCompany}`)

  }

  
  /* ========
     Star Files
     ========*/ 
  newFile(idCompany:string,file:fileSend):Observable<FileResponse>{ 
    const data:FormData = new FormData();
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')

    data.append('baseName',String(file.baseName));
    data.append('file',file.file);
    data.append('description',file.description);
    
    return this.http.post<FileResponse>(`${this.urlFile}/${idCompany}`,data,{headers})
  }

  getFiles(idCompany:string):Observable<FileResponse>{ 
    return this.http.get<FileResponse>(`${this.urlFile}/${idCompany}`)
  }


  getFile(idCompany:string,idProduct:string):Observable<FileResponse>{ 
    return this.http.get<FileResponse>(`${this.urlFile}/${idCompany}/${idProduct}`)
  }

  updateFile(idCompany:string,idProduct:string, File:fileCompany):Observable<FileResponse>{ 
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')

    return this.http.put<FileResponse>(`${this.urlFile}/${idCompany}/${idProduct}`,File,{headers})
  }

  deleteFile(idCompany:string,idProduct:string):Observable<FileResponse>{ 
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')

    return this.http.delete<FileResponse>(`${this.urlFile}/${idCompany}/${idProduct}`,{headers})
  }

  // End Files ///

  addProduct(product:Product | any):Observable<ProductResponse>{
    const data:FormData = new FormData();
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    
    data.append('name',product.name);
    data.append('price',product.price);
    data.append('description',product.description);
    data.append('categories',product.categories);
    data.append('image',product.image);

    return this.http.post<ProductResponse>(`${this.urlProducts}/${this.currentIDCompany}`,data,{headers})
  }


  deleteProduct(id:string):Observable<ProductResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')

    return this.http.delete<ProductResponse>(`${this.urlProducts}/${id}`,{headers})
  }

  updateProduct(idProduct:string,product:Product | any):Observable<ProductResponse>{
    const data:FormData = new FormData();
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    
    if(product.name) data.append('name',product.name);
    if(product.price) data.append('price',product.price);
    if(product.description) data.append('description',product.description);
    if(product.categories) data.append('categories',product.categories);
    if(product.image) data.append('image',product.image);

    return this.http.put<ProductResponse>(`${this.urlProducts}/${this.getCurrentIDCompany}/${idProduct}`,data,{headers})

  }

  getProductById(idProduct:string):Observable<ProductResponse>{
    
  
    return this.http.get<ProductResponse>(`${this.urlProducts}/${this.getCurrentIDCompany}/${idProduct}`)
  }

  getWeb(idCompany:string):Observable<WebResponse>{
    return this.http.get<WebResponse>(`${this.url}/${idCompany}/web`)
  }

  updateWeb(idCompany:string,web:webCompany | any):Observable<WebResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    const data:FormData = new FormData();
    
    if(web.title) data.append('title',web.title);
    if(web.keywords) data.append('keywords',web.keywords);
    if(web.cssExtra) data.append('cssExtra',web.cssExtra);
    if(web.jsExtra) data.append('jsExtra',web.jsExtra);
    if(web.genericHeaderHTML) data.append('genericHeaderHTML',web.genericHeaderHTML);
    if(web.genericFooterHTML) data.append('genericFooterHTML',web.genericFooterHTML);
    if(web.logo) data.append('logo',web.logo);
    if(web.favicon) data.append('favicon',web.favicon);

    return this.http.put<WebResponse>(`${this.url}/${idCompany}/web`,data,{headers})
  }

  // Pages
  getPages(idCompany:string):Observable<PageResponse>{
    return this.http.get<PageResponse>(`${this.url}/${idCompany}/web/pages`)
  }

  getPage(idCompany:string,idPage:string):Observable<PageResponse>{
    return this.http.get<PageResponse>(`${this.url}/${idCompany}/web/pages/${idPage}`)
  }

  newPage(idCompany:string,page:pageCompany):Observable<PageResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    return this.http.post<PageResponse>(`${this.url}/${idCompany}/web/pages`,page,{headers})
  }

  deletePage(idCompany:string,idPage:String):Observable<PageResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    return this.http.delete<PageResponse>(`${this.url}/${idCompany}/web/pages/${idPage}`,{headers})
  }

  // Block
  getBlocks(idCompany:string,idPage:string):Observable<BlockResponse>{
    return this.http.get<BlockResponse>(`${this.url}/${idCompany}/web/pages/${idPage}/blocks`)
  }

  getBlock(idCompany:string,idPage:string,idBlock:string):Observable<BlockResponse>{
    return this.http.get<BlockResponse>(`${this.url}/${idCompany}/web/pages/${idPage}/blocks/${idBlock}`)
  }

  newBlock(idCompany:string,idPage:string,block:Block):Observable<BlockResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    return this.http.post<BlockResponse>(`${this.url}/${idCompany}/web/pages/${idPage}/blocks`,block,{headers})
  }

  updateBlock(idCompany:string,idPage:string,block:Block):Observable<BlockResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    return this.http.put<BlockResponse>(`${this.url}/${idCompany}/web/pages/${idPage}/blocks/${block._id}`,block,{headers})
  }

  updateBlockWithID(idCompany:string,idPage:string,idBlock:string,block:Block):Observable<BlockResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    return this.http.put<BlockResponse>(`${this.url}/${idCompany}/web/pages/${idPage}/blocks/${idBlock}`,block,{headers})
  }

  deleteBlock(idCompany:string,idPage:String,idBlock:string):Observable<BlockResponse>{
    const headers = new HttpHeaders().append('x-token', localStorage.getItem('token') || '')
    return this.http.delete<BlockResponse>(`${this.url}/${idCompany}/web/pages/${idPage}/blocks/${idBlock}`,{headers})
  }


}

