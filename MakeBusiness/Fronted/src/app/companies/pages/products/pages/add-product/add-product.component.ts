import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  myForm:FormGroup = this.fb.group({
    name   : ["",[Validators.required]],
    description: ["",[Validators.required]],
    price: ["",[Validators.required,this.validatorService.isNumber]],
    category: ["",[Validators.required]],
  });

  constructor(private fb:FormBuilder,private validatorService:ValidatorService) { }

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
