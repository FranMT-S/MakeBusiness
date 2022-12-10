import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company, CompanyWithWeb } from 'src/app/interfaces/company';
import { CompanyWithWebResponse } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  public page:number | undefined;
  url = `${environment.baseUrl}/uploads/web`;
  companies:CompanyWithWeb[] = [  ]
  

  constructor(private companyService:CompanyService,private router:Router, private authService:AuthService) {
   

    this.companyService.getAllCompanyWithWebAndPages.subscribe(res =>{
      if(res.ok){
        this.companies = res.companies;
      }
    })

   }

   navigated(company:CompanyWithWeb){
    
      this.router.navigateByUrl(`/companies/${company._id}/pages/${company.web.pageMain}`)
   }

  ngOnInit(): void {
    this.authService.validarToken().subscribe();

  }

}
