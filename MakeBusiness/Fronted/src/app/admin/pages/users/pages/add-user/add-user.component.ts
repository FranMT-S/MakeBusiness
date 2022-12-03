import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  myForm:FormGroup = this.fb.group({
    userName   : ["",[Validators.required]],
    password: ["",[Validators.required]],
    email: ["",[Validators.required,Validators.pattern(this.validatorService.emailPattern)]],
    type: ["",[Validators.required,this.validatorService.notBlank]],
  });


  constructor(private fb:FormBuilder,private validatorService:ValidatorService,
              private userService:UserService
            ) { }

  ngOnInit(): void {
  }

  fieldNotValid(field:string){
      return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  save(){


    if(this.myForm.valid){
      console.log(this.myForm.value)
      this.userService.newUser(this.myForm.value).subscribe(res =>{
        if(res.ok){
          alert("Agregado con exito")
          this.myForm.reset()
       
        }else{
          alert("no se pudo ingresar el usuario")
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
