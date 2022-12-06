import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { ValidatorService } from 'src/app/services/validator.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  hide = true;
  myForm:FormGroup = this.fb.group({
    email   : ["compania3@gmail.com",[Validators.required,Validators.pattern(this.validatorService.emailPattern)]],
    password: ["1234",[Validators.required]]
  });

  constructor(private router:Router, private authService:AuthService,
    private fb:FormBuilder, private companyService:CompanyService,
    private validatorService:ValidatorService) { }
  ngOnInit(): void {
  }


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  login(){
   
    if(!this.myForm.invalid){
      const {email, password} = this.myForm.value
      this.authService.login(email, password)
        .subscribe(ok =>{
          if(ok === true){

            switch (this.authService.user.type) {
              case "client":
                this.router.navigateByUrl("/clients");
                break;
              case "admin":
                this.router.navigateByUrl("/admin");
                break;
              case "company":
                this.companyService.getCompanyByUser(this.authService.user._id).subscribe( res =>{
                  if(res.ok){
                    localStorage.setItem("_web",res.company._id)
                    this.companyService.setCurrentIDCompany = res.company._id;
                    this.router.navigateByUrl(`/admin-companies/${res.company._id}`);
                  }
                })
                break;
            }
            
          }else{
            Swal.fire({ background:'rgba(250,250,250,0.96)',
                        title: 'Oops!!',
                        text: `${ok}`,                  
                        icon: 'error',
                        confirmButtonColor: '#3085d6'
            });
          }
        });
    }
   
  }

}
