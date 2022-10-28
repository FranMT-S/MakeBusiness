import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './business/business.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  {
    path:"business",
    component:BusinessComponent
  },
  {
    path:"client",
    component:ClientComponent
  },
  {
    path:"",
    redirectTo:"business",
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule { }
