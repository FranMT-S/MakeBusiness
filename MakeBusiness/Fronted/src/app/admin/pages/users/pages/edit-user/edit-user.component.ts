import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Params, Router } from '@angular/router';

import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validator.service';
// import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  // Vars
  user:User = {} as User;

  myForm:FormGroup = this.fb.group({
    userName   : ["",[Validators.required]],
    password: ["",[Validators.required]],
    email: ["",[Validators.required,Validators.pattern(this.validatorService.emailPattern)]],
    type: ["",[Validators.required,this.validatorService.notBlank]],
  });

  constructor(private activatedRoute:ActivatedRoute,private userService:UserService,
              private fb:FormBuilder, private validatorService:ValidatorService, private router:Router) { 

                this.activatedRoute.params.subscribe( (params:Params) => {
                  this.getUser(params['id'])
              }) 
  }

  ngOnInit(): void {
    
 
  }

  getUser(id:string){
    this.userService.getUser(id).subscribe( res =>{
      if(res.ok){
         
          this.user = res.user; 
      
          this.myForm.setValue({
            userName: this.user.userName,
            password: this.user.password,
            email: this.user.email,
            type: this.user.type,
          })
        
      
      }
    });


  }

  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  save(){
   
    if(this.myForm.valid){

      this.userService.updateUser(this.user._id,this.myForm.value).subscribe(res =>{
        
        if(res.ok){
          alert("Modificado con exito")
          this.router.navigateByUrl("admin/users")
        }else{
          alert(res.msg)
          console.log(res.error)
        }
      })
    }else{
      alert("Ingrese los datos correctos")
      console.log(this.myForm.valid)
      console.log(this.myForm.value)
    }

  }
}
