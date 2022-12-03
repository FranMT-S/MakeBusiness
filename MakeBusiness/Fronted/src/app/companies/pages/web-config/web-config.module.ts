import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebConfigRoutingModule } from './web-config-routing.module';
import { WebConfigComponent } from './web-config/web-config.component';
import { EditWebComponent } from './pages/edit-web/edit-web.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WebConfigComponent,
    EditWebComponent
  ],
  imports: [
    CommonModule,
    WebConfigRoutingModule,
    ReactiveFormsModule
  ]
})
export class WebConfigModule { }
