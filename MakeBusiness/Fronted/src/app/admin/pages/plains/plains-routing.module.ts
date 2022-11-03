import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlainComponent } from './pages/add-plain/add-plain.component';
import { EditPlainComponent } from './pages/edit-plain/edit-plain.component';
import { ListPlainsComponent } from './pages/list-plains/list-plains.component';
import { PlainsComponent } from './plains/plains.component';

const routes: Routes = [

  {
    path:"",
    component:PlainsComponent,
    children: [
      {
        path:"add-plain",
        component:AddPlainComponent
      },
      {
        path:"list",
        component:ListPlainsComponent
      },
      {
        path:":id/edit-plain",
        component:EditPlainComponent
      },
      {
        path:"",
        redirectTo:"list"
      },
      
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlainsRoutingModule { }
