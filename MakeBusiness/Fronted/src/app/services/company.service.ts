import { Injectable } from '@angular/core';
import { Company } from '../interfaces/company';

const Data:Company[] =[{
  "id": '1',
  "nameCompany": "Olenolin",
  "description": "Empresa de sombreros",
  "phone": "161-430-5930",
  "category": "Health Care",
  "location": "2 Crownhardt Plaza",
  "state": true,
  "idPlan": "3",
  "idWeb": '2',
  "idUser": '8'
}, {
  "id": '2',
  "nameCompany": "Lily",
  "phone": "997-109-8572",
  "description": "Empresa de tecnologia",
  "category": "Tecnology",
  "location": "53 Sutherland Trail",
  "state": true,
  "idPlan": "3",
  "idWeb": '2',
  "idUser": '9'
}, {
  "id": '3',
  "nameCompany": "Evey",
  "phone": "968-276-4037",
  "description": "Empresa de tecnologia",
  "category": "Technology",
  "location": "27 Portage Street",
  "state": true  ,
  "idPlan": "3",
  "idWeb": '3',
  "idUser": '10'
}]

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  get getAllCompany():Company[]{
    return [...Data]
  }

  getCompanyById(id:string):Company | undefined{
    return Data.find( e => e.id == id );
  }

  getCompanyByUser(idUser:string):Company | undefined{
    return Data.find( e => e.idUser == idUser );
  }

  changeStateCompany(id:string):boolean{
    let company = Data.find( e => e.id == id );
    
    if(company != undefined){
      company.state = !company.state;
      return true;
    }

    return false;
  }
}
