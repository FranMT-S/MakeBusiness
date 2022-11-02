import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates/templates.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    MaterialModule
  ]
})
export class TemplatesModule { }
