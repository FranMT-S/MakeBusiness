import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ValidarTokenGuard } from './guards/validar-token.guard';
import { LandingComponent } from './landing-page/landing/landing.component';
import { Page404Component } from './shared/page404/page404.component';

const routes: Routes = [
  { 
    path: "landing-page" , 
    component: LandingComponent
  },
  { 
    path: "auth", 
    loadChildren: () => import("./auth/auth.module").then( module => module.AuthModule)
  },
  {
    path:"registry",
    loadChildren: () => import("./registry/registry.module").then(module => module.RegistryModule)
  },
  {
    path:"clients",
    loadChildren: () => import("./client/client.module").then(module => module.ClientModule)
  },
  {
    path:"admin-companies/:id",
    loadChildren: () => import("./companies/companies.module").then(module => module.CompaniesModule),
    canActivate: [ValidarTokenGuard ],
    canLoad: [ValidarTokenGuard ],
    canActivateChild: [ValidarTokenGuard]
  },
  {
    path:"admin",
    loadChildren: () => import("./admin/admin.module").then(module => module.AdminModule),
    canActivate: [ ValidarTokenGuard],     
    canLoad: [ ValidarTokenGuard],
    canActivateChild: [ValidarTokenGuard]
  },
 
  { path: "", redirectTo: "landing-page", pathMatch: "full"},
  { path: "**", component: Page404Component}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
