import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { pageCompany } from 'src/app/interfaces/page';
import { webCompany } from 'src/app/interfaces/web';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  web!:webCompany
  pages:pageCompany[] = [];

  constructor(private activatedRoute:ActivatedRoute,
              private companyService:CompanyService,
              private router:Router
              ) { 

    let favIcon: HTMLLinkElement | null = document.querySelector('#favIcon'); 
   

    this.activatedRoute.params.subscribe((params:Params) => {
      let id = params['id']   
      this.companyService.setCurrentIDCompany = id;
      this.companyService.getWebWithPages(id).subscribe(res =>{
        if(res.ok) {
          this.web = res.web
          favIcon!.href = `${environment.baseUrl}/uploads/web/${this.web.favicon}` 
          this.pages = res.web.pages;
       
        }
      })

    })

  }

  ngOnInit(): void {

  }

  navigated(nameDirection:string){

      this.router.navigate([nameDirection], {relativeTo:this.activatedRoute  })
  }

}
