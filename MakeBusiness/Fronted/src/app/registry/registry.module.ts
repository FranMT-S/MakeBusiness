import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistryRoutingModule } from './registry-routing.module';
import { ClientComponent } from './client/client.component';
import { BusinessComponent } from './business/business.component';
import { MaterialModule } from '../material/material.module';
import { RegistryComponent } from './registry/registry.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientComponent,
    BusinessComponent,
    RegistryComponent
  ],
  imports: [
    CommonModule,
    RegistryRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RegistryModule { }
