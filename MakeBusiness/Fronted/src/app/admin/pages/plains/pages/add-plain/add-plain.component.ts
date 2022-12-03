import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanService } from 'src/app/services/plain.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-add-plain',
  templateUrl: './add-plain.component.html',
  styleUrls: ['./add-plain.component.scss']
})
export class AddPlainComponent implements OnInit {

  myForm:FormGroup = this.fb.group({
    name   : ["",[Validators.required]],
    description: ["",[Validators.required]],
    price: ["",[Validators.required,this.validatorService.isNumber]],
    annuity: ["",[Validators.required,this.validatorService.notBlank]],
    limitPages: ["",[Validators.required,this.validatorService.isInteger]],
    limitProducts: ["",[Validators.required,this.validatorService.isInteger]],
    limitFiles: ["",[Validators.required,this.validatorService.isInteger]],
  });

  constructor(private fb:FormBuilder,private validatorService:ValidatorService,
              private planService:PlanService, private router:Router) { }

  ngOnInit(): void {
  }


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  save(){

    if(this.myForm.valid){
      this.planService.addPlan(this.myForm.value).subscribe(res =>{
        if(res.ok){
          alert("Agregado con exito")
          this.myForm.reset()
       
        }else{
          alert(res.msg)
          console.log(res.error)
        }
      })
    }else{
      alert("Ingrese los datos correctos")
    }
  }
}
