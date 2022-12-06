import { Company } from "./company";
import { fileCompany } from "./fileCompany";
import { Product } from "./product";
import { User } from "./user";
import { webCompany } from "./web";

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

   
  export interface WebResponse {
    ok:       boolean;
    file: fileCompany;
    files: fileCompany[];
    error: any;
    msg: string;
  }

  export interface WebResponse {
    ok:       boolean;
    file: fileCompany;
    files: fileCompany[];
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