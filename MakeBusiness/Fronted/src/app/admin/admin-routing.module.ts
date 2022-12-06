import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmingGuard } from '../guards/validar-rol.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    canActivate:[AdmingGuard], canLoad:[AdmingGuard],
    children:[
      {
        path:"companies",
        loadChildren: () => import('./pages/companies/companies.module').then(module => module.CompaniesModule)
      },
      {
        path:"plans",
        loadChildren: () => import('./pages/plains/plains.module').then(module => module.PlainsModule)
      },
      {
        path:"templates",
        loadChildren: () => import('./pages/templates/templates.module').then(module => module.TemplatesModule)
      },
      {
        path:"users",
        loadChildren: () => import('./pages/users/users.module').then(module => module.UsersModule)
      },
    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
