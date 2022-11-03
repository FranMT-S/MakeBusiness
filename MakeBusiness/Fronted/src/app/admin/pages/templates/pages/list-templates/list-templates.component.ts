import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateDescription } from 'src/app/interfaces/page';
import { TemplateService } from 'src/app/services/template.service';



@Component({
  selector: 'app-list-templates',
  templateUrl: './list-templates.component.html',
  styleUrls: ['./list-templates.component.scss']
})
export class ListTemplatesComponent implements OnInit {

  templates:TemplateDescription[] = [];

  constructor(private router:Router,private templateService:TemplateService) { }

  ngOnInit(): void {
    this.templates = this.templateService.getAllTemplates;
  }

  editTemplate(template:TemplateDescription){
    this.router.navigate([`admin/templates/${template.id}/edit-template`])
  }

}
