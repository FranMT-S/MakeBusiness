import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { HistoryPurchasesComponent } from './pages/history-purchases/history-purchases.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path:"",
    component:ClientComponent,
    children : [
      {path:"companies",component:CompaniesComponent},
      {path:"car_shopping",component:ShoppingCartComponent},
      {path:"historical",component:HistoryPurchasesComponent
}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
