import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validator.service';
import Swal from 'sweetalert2'   


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
     
      this.userService.newUser(this.myForm.value).subscribe(res =>{
        if(res.ok){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cambios Exitosos',
            showConfirmButton: true,
          }).then(()=>{
            this.myForm.reset()
	        })   
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
      Swal.fire({ 
        background:'rgba(250,250,250,0.96)',
        title: 'Oops!! hubo un error',
        text: `Ingrese los datos correctamente`,                  
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });

      console.log(this.myForm.value)
    }
  }

}
