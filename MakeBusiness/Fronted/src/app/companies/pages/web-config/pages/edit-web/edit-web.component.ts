import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { webCompany } from 'src/app/interfaces/web';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-edit-web',
  templateUrl: './edit-web.component.html',
  styleUrls: ['./edit-web.component.scss']
})
export class EditWebComponent implements OnInit {
  
  web:webCompany = {} as webCompany;



  buttons = [{"text":'Editar Encabezado', "name":"header"},
              {"text":'Editar Pie de pagina', "name":"footer"},
              {"text":'Editar CSS', "name":"css"},
              {"text":'Editar JS', "name":"js"},
      ]

    myForm:FormGroup = this.fb.group({
    title   : [,[Validators.required]],
    description: [,[Validators.required]],
    keywords: [,[Validators.required]],
  });
   


  constructor(private companyService:CompanyService,private fb:FormBuilder) { }

  ngOnInit(): void {
   
    this.web = this.companyService.getCurrentWeb;
    this.myForm.setValue({
      title   :  this.web.title,
      description: this.web.description,
      keywords: this.web.keywords
    })
  }


  fieldNotValid(field:string){
    return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  save(){

    console.log(this.myForm.valid)
    console.log(this.myForm.value)
  }
}
