import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CompanyService } from 'src/app/services/company.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

   // Vars
   product:Product = {} as Product;

   myForm:FormGroup = this.fb.group({
    name   : ["",[Validators.required]],
    description: ["",[Validators.required]],
    price: ["",[Validators.required,this.validatorService.isNumber]],
    category: ["",[Validators.required]],
  });

   constructor(private activatedRoute:ActivatedRoute,private companyService:CompanyService,
              private fb:FormBuilder,private validatorService:ValidatorService) { 



    this.activatedRoute.params.subscribe( (params:Params) => {
      this.companyService.getCompanyProducts(this.companyService.getCompany._id)
      // this.product = this.companyService.getProductById(params['id'])
      
      this.myForm.setValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        category: this.product.categories,

      })

    })
    
   }
 

  ngOnInit(): void {
  }


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  save(){

    console.log(this.myForm.valid)
    console.log(this.myForm.value)
  }
}
