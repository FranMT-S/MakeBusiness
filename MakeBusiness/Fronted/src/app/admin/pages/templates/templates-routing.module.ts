import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTemplateComponent } from './pages/add-template/add-template.component';
import { EditCodeComponent } from './pages/edit-template/components/edit-code/edit-code.component';
import { EditTemplateComponent } from './pages/edit-template/edit-template.component';
import { ListTemplatesComponent } from './pages/list-templates/list-templates.component';
import { TemplatesComponent } from './templates/templates.component';

const routes: Routes = [
  {
    path:"",
    component:TemplatesComponent,
    children:[
      {
        path:"list",
        component:ListTemplatesComponent,
      },
      {
        path:"add-template",
        component:AddTemplateComponent,
      },
      {
        path:":id/edit-template",
        component:EditTemplateComponent,
      },      
      {
        path:":id/edit-template/code",
        component:EditCodeComponent,
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
export class TemplatesRoutingModule { }
