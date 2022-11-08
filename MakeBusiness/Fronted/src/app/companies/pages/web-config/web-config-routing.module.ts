import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditWebComponent } from './pages/edit-web/edit-web.component';
import { WebConfigComponent } from './web-config/web-config.component';

const routes: Routes = [
  {
    path:"",
    component:WebConfigComponent,
    children:[
      {path: "edit", component:EditWebComponent, pathMatch:"full"},
      {path: "", redirectTo:"edit", pathMatch:"full"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebConfigRoutingModule { }
