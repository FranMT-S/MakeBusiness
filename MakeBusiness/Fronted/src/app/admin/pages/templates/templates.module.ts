import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates/templates.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddTemplateComponent } from './pages/add-template/add-template.component';
import { EditTemplateComponent } from './pages/edit-template/edit-template.component';
import { ListTemplatesComponent } from './pages/list-templates/list-templates.component';
import { EditCodeComponent } from './pages/edit-template/components/edit-code/edit-code.component';
import { EditorWYSIWYGModule } from 'src/app/editor-wysiwyg/editor-wysiwyg.module';
import { FormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './pipes/html-decoder.pipe';
import { DialogComponent } from './pages/edit-template/components/dialog/dialog.component';



@NgModule({
  declarations: [
    TemplatesComponent, 
    AddTemplateComponent, 
    EditTemplateComponent, 
    ListTemplatesComponent, 
    EditCodeComponent, 
    SafeHtmlPipe, DialogComponent
    ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    MaterialModule,
    EditorWYSIWYGModule,
    FormsModule
  ]
})
export class TemplatesModule { }
