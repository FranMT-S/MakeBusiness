import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  hide= true;
  myForm:FormGroup = this.fb.group({
    name   : [,[Validators.required]],
    email   : [,[Validators.required,Validators.pattern(this.validatorService.emailPattern)]],
    password: [,[Validators.required]]
  });


  constructor(private fb:FormBuilder,private validatorService:ValidatorService) { }

  ngOnInit(): void {
  }


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  register(){
    
  }

}
