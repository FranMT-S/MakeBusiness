import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { registerClientSend } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorService } from 'src/app/services/validator.service';
import Swal from 'sweetalert2'   


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  hide= true;
  myForm:FormGroup = this.fb.group({
    userName   : [,[Validators.required]],
    email   : [,[Validators.required,Validators.pattern(this.validatorService.emailPattern)]],
    password: [,[Validators.required]]
  });


  constructor(private fb:FormBuilder,private validatorService:ValidatorService,private authService:AuthService,
         private router: Router

    ) { }

  ngOnInit(): void {
  }


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  register(){
      
            
    if(this.myForm.valid){
        const client:registerClientSend = this.myForm.value;
        this.authService.registerClient(client).subscribe(res =>{
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
