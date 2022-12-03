import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  hide = true;
  myForm:FormGroup = this.fb.group({
    email   : [,[Validators.required,Validators.pattern(this.validatorService.emailPattern)]],
    password: [,[Validators.required]]
  });

  constructor(private router:Router, private fb:FormBuilder,private validatorService:ValidatorService) { }
  ngOnInit(): void {
  }


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }



  login(){

    if(!this.myForm.invalid)
      this.router.navigateByUrl("/clients");
  }

}
