import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator.service';

interface plain {
  id: number;
  name: string;
}

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BusinessComponent implements OnInit {
  hide = true;
  /// Recordar hacer la validacion del input plan
  plains:plain[]=
              [
                {
                  id:1,
                  name:"free"
                },
                {
                  id:2,
                  name:"basic"
                },
                {
                  id:3,
                  name:"premium"
                },
              ]
  myForm:FormGroup = this.fb.group({
    name   : [,[Validators.required]],
    nameCompany   : [,[Validators.required]],  
    email   : [,[Validators.required,Validators.pattern(this.validatorService.emailPattern)]],
    password: [,[Validators.required]]
  });

  constructor(private fb:FormBuilder,private validatorService:ValidatorService) { }

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

  }

}
