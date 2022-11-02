import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlainsRoutingModule } from './plains-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PlainsComponent } from './plains/plains.component';


@NgModule({
  declarations: [PlainsComponent],
  imports: [
    CommonModule,
    PlainsRoutingModule,
    MaterialModule
  ]
})
export class PlainsModule { }
