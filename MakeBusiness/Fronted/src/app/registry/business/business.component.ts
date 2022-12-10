import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plan } from 'src/app/interfaces/plains';
import { registerCompanySend } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import { PlanService } from 'src/app/services/plain.service';
import { ValidatorService } from 'src/app/services/validator.service';
import Swal from 'sweetalert2'




@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BusinessComponent implements OnInit {
  hide = true;
  /// Recordar hacer la validacion del input plan
 
  plans:Plan[] = [];
  myForm:FormGroup = this.fb.group({
    userName   : [,[Validators.required]],
    email   : [,[Validators.required,Validators.pattern(this.validatorService.emailPattern)]],
    nameCompany   : [,[Validators.required]],  
    password: [,[Validators.required]],
    idPlan: [,[Validators.required]]
  });

  constructor(private fb:FormBuilder,private validatorService:ValidatorService,
              private planService:PlanService,private authService:AuthService,
              private router: Router) { 

    this.planService.getAllPlans.subscribe(res =>{
      if(res.ok) 
        this.plans = res.plans;
        
    })  
  }

  ngOnInit(): void {
 

  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.

  }

  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  register(){
              
         
    
    if(this.myForm.valid){
        const company:registerCompanySend = this.myForm.value;
        this.authService.registerCompany(company).subscribe(res =>{
          if(res.ok){
            Swal.fire({
              position: 'center',
              icon: 'success',
              text: `${res.msg}`,
              title: 'Correcto',
            })
            this.router.navigateByUrl('/auth/login');
          }
        },({error}) =>{
          Swal.fire({ 
            background:'rgba(250,250,250,0.96)',
            title: 'Oops!! hubo un error',
            text: `${error.msg}`,                  
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
          console.log(error)
        })
    }else{
      Swal.fire({ background:'rgba(250,250,250,0.96)',
      title: 'Oops!!',
      text: `Llene todos los campos`,                  
      icon: 'error',
      confirmButtonColor: '#3085d6'
      });
    }
  }
        
}
