import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TemplateDescription } from 'src/app/interfaces/page';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {
  // Vars
  template:TemplateDescription = {} as TemplateDescription;


  constructor(private activatedRoute:ActivatedRoute,private templateService:TemplateService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params:Params) => {
        let data = this.templateService.getTemplateDescription(params['id']);
        if(data != undefined)
          this.template = data; 
      }
    ) 
  }

  fieldNotValid(field:string){
    // return this.myForm.get(field)?.invalid && this.myForm.get(field)?.touched;
  }

  save(){

    // console.log(this.myForm.valid)
    // console.log(this.myForm.value)
  }
}
