import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

   // Vars
   product:Product = {} as Product;

   constructor(private activatedRoute:ActivatedRoute,private companyService:CompanyService) { 



    this.activatedRoute.params.subscribe( (params:Params) => {
      this.companyService.getCompanyProducts(this.companyService.getCompany.id)
      this.product = this.companyService.getProductById(params['id'])
      console.log(this.companyService.getCurrentProducts)
    })
    
   }
 

  ngOnInit(): void {
  }

}
