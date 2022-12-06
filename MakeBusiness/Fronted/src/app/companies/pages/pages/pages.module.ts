import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages-component/pages.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { EditorWYSIWYGModule } from 'src/app/editor-wysiwyg/editor-wysiwyg.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    PagesComponent,
    EditPageComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    MaterialModule,
    EditorWYSIWYGModule,
    PipesModule
  ]
})
export class PagesModule { }
