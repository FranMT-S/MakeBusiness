import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    title   : [,[],[]],
    description: [,[],[]],
    keywords: [,[],[]],
    
  });
   


  constructor(private companyService:CompanyService,private fb:FormBuilder) { }

  ngOnInit(): void {

    this.web = this.companyService.getCurrentWeb;
  }

}
