import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlainsRoutingModule } from './plains-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { PlainsComponent } from './plains/plains.component';
import { AddPlainComponent } from './pages/add-plain/add-plain.component';
import { EditPlainComponent } from './pages/edit-plain/edit-plain.component';
import { ListPlainsComponent } from './pages/list-plains/list-plains.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PlainsComponent, AddPlainComponent, EditPlainComponent, ListPlainsComponent],
  imports: [
    CommonModule,
    PlainsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PlainsModule { }
