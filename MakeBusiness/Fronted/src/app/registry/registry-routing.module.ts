import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business/business.component';
import { ClientComponent } from './client/client.component';
import { RegistryComponent } from './registry/registry.component';

const routes: Routes = [
  {
    path:"",
   component:RegistryComponent,  
  },
  {
    path:"business",
    component:BusinessComponent
  },
  {
    path:"client",
    component:ClientComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule { }
