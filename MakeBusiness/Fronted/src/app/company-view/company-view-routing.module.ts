import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from '../shared/page404/page404.component';
import { CompanyComponent } from './company/company.component';
import { PagesComponent } from './pages/pages.component';
import { ShopComponent } from './stored/shop.component';

const routes: Routes = [  
      {
            path:":id/pages",
            component:CompanyComponent,
            children : [
              {path:"shop",component:ShopComponent},
              {path:":idPage",component:PagesComponent},
            ]
    },
    { path: "**", component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyViewRoutingModule { }
