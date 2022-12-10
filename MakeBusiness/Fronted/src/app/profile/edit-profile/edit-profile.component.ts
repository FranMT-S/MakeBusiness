import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Params, Router } from '@angular/router';

import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { environment } from 'src/environments/environment';
// import { switchMap, tap } from 'rxjs/operators';
import Swal from 'sweetalert2'   


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  // Vars
  user:User = {} as User;

  url:string = `${environment.baseUrl}/uploads/users/`
  public image!: File | null;
  public imageURL:string | undefined = this.url;

  myForm:FormGroup = this.fb.group({
    userName   : ["",[Validators.required]],
    password: ["",[Validators.required]],
    email: ["",[Validators.required,Validators.pattern(this.validatorService.emailPattern)]]
  });

  constructor(private  userService:UserService, private authService:AuthService,
              private fb:FormBuilder, private validatorService:ValidatorService, private router:Router
              ) 
  { 

    this.user = this.authService.user;
    this.imageURL = this.url + this.user.image
    this.myForm.setValue({
      userName: this.user.userName,
      password: this.user.password,
      email: this.user.email,
    }) 
  }

  ngOnInit(): void {
    
 
  }


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  changeImage(event:any){
    const allow = ['image/png', 'image/jpeg', 'image/jpg']
    this.image = event?.target?.files[0];
    if (!this.image) 
      return; 
  
    if(!allow.includes(this.image.type)) {
      Swal.fire({ 
        background:'rgba(250,250,250,0.96)',
        title: 'Oops!! hubo un error',
        text: `Tipo de archivo no valido`,                  
        icon: 'error',
        confirmButtonColor: '#3085d6'
      });
       return;
    }
    const reader = new FileReader();
 
    reader.readAsDataURL(this.image);  
    reader.onload = (event) => {   
      this.imageURL = event.target?.result?.toString();
    }
  }

  save(){
   
    if(this.myForm.valid){
      
      const {userName,email,password} = this.myForm.value
      let image = this.image;


      let user = {
        userName,
        email,
        password,
        image,
      }

        console.log(user)

        this.userService.updateUser(this.user._id,user).subscribe(res =>{   
          if(res.ok){
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cambios Exitosos',
              showConfirmButton: true,
            }).then(()=>{
              this.router.navigateByUrl("/auth/login")
       
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
    }
  }
}
