import { Interface } from "readline";
import { Company } from "./company";
import { fileCompany } from "./fileCompany";
import { Block, pageCompany } from "./page";
import { Product } from "./product";
import { Client, User } from "./user";
import { webCompany } from "./web";

export interface basicResponse{
  ok:       boolean;
  error: any;
  msg:string
}

export interface CompanyResponse {
    ok:       boolean;
    companies: Company[];
    company:  Company;
    error: any;
    msg:string
  }
  
  export  interface ProductResponse {
    ok:       boolean;
    products: Product[];
    product:  Product;
    error: any;
    msg: string;
  }
  
  export interface FileResponse {
    ok:       boolean;
    files: fileCompany[];
    file:  fileCompany;
    error: any;
    msg: string;
  }
  
  export interface WebResponse {
    ok:       boolean;
    web: webCompany;
    error: any;
    msg: string;
  }

   

  
export interface PageResponse {
  ok:       boolean;
  page: pageCompany;
  pages: pageCompany[];
  error: any;
  msg: string;
}

export interface BlockResponse {
  ok:       boolean;
  block: Block;
  blocks: Block[];
  error: any;
  msg: string;
}

export interface ClientResponse {
  ok:       boolean;
  Client: Client;
  Clients: Client[];
  error: any;
  msg: string;
}

export interface LoginResponse {
    ok    : boolean;
    msg?  : string;
    data? : User;
    token?: string;
}

export interface AuthResponse {
    ok: boolean;
    msg?: string;
    data?: User;
    token?: string;
}


export interface registerCompanySend {
  userName:String,
  email:String,
  nameCompany: string,
  password:string,
  idPlan: string
}
