import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Plan } from 'src/app/interfaces/plains';
import { PlanService } from 'src/app/services/plain.service';
import { ValidatorService } from 'src/app/services/validator.service';

import Swal from 'sweetalert2'   


@Component({
  selector: 'app-edit-plain',
  templateUrl: './edit-plain.component.html',
  styleUrls: ['./edit-plain.component.scss']
})
export class EditPlainComponent implements OnInit {

  // Vars
  plan:Plan = {} as Plan;
  
  myForm:FormGroup = this.fb.group({
    name   : ["",[Validators.required]],
    description: ["",[Validators.required]],
    price: ["",[Validators.required,this.validatorService.isNumber]],
    annuity: ["",[Validators.required,this.validatorService.notBlank]],
    limitPages: ["",[Validators.required,this.validatorService.isInteger]],
    limitProducts: ["",[Validators.required,this.validatorService.isInteger]],
    limitFiles: ["",[Validators.required,this.validatorService.isInteger]],
  });

  constructor(private activatedRoute:ActivatedRoute,private planService:PlanService, private fb:FormBuilder,
              private validatorService:ValidatorService,private router:Router) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params:Params) => {
        this.getPlan(params['id']);
    
      }) 
  }

  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  getPlan(id:string){
    this.planService.getPlan(id).subscribe( res =>{
      
      if(res.ok){
        this.plan = res.plan; 
        this.myForm.setValue({
          name   : this.plan.name,
          description: this.plan.description,
          price: this.plan.price,
          annuity: this.plan.annuity,
          limitPages: this.plan.limitPages,
          limitProducts: this.plan.limitProducts,
          limitFiles: this.plan.limitFiles,
        
        }
    
        )
      }
    })

  
  }

  save(){

    if(this.myForm.valid){
      this.planService.updatePlan(this.plan._id,this.myForm.value).subscribe(res =>{
        if(res.ok){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cambios Exitosos',
            showConfirmButton: true,
          }).then(()=>{
            this.router.navigateByUrl("admin/plans")
	        })
          
        }else{
          Swal.fire({ 
            background:'rgba(250,250,250,0.96)',
            title: 'Oops!! hubo un error',
            text: `${res.msg}`,                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
          console.log(res.error)
        }
      })
    }
  }
}
