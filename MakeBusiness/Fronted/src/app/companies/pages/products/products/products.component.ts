import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private companyService: CompanyService, private activatedRoute:ActivatedRoute) { 


  }

  ngAfterContentInit(): void {
    this.activatedRoute.params.subscribe( (params:Params) => {
      this.companyService.getCompanyProducts(this.companyService.getCompany.id);
    })
  
  }

  ngOnInit(): void {
  }

}
