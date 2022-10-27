import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing-page/landing/landing.component';
import { Page404Component } from './shared/page404/page404.component';

const routes: Routes = [
  { 
    path: "landing-page" , 
    component: LandingComponent
  },
  // { 
  //   path: "auth", 
  //   loadChildren: () => import("./auth/auth.module").then( module => module.AuthModule)
  // },
 
  { path: "", redirectTo: "landing-page", pathMatch: "full"},
  { path: "**", component: Page404Component}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
