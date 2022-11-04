import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { AddCompanyComponent } from './pages/add-company/add-company.component';
import { EditCompanyComponent } from './pages/edit-company/edit-company.component';
import { ListCompaniesComponent } from './pages/list-companies/list-companies.component';

const routes: Routes = [
  {
    path:"",
    component:CompaniesComponent,
    children:[
      {path: "list", component:ListCompaniesComponent, pathMatch:"full"},
      {path: "add-company", component:AddCompanyComponent, pathMatch:"full"},
      {path: "edit-company", component:EditCompanyComponent, pathMatch:"full"},
      {path: "", redirectTo:"list", pathMatch:"full"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
