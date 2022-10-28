import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistryRoutingModule } from './registry-routing.module';
import { ClientComponent } from './client/client.component';
import { BusinessComponent } from './business/business.component';


@NgModule({
  declarations: [
    ClientComponent,
    BusinessComponent
  ],
  imports: [
    CommonModule,
    RegistryRoutingModule
  ]
})
export class RegistryModule { }
