import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [{
      path:"",
      component:ProductsComponent,
      children:[
        {path: "list", component:ListProductsComponent, pathMatch:"full"},
        {path: "add-product", component:AddProductComponent, pathMatch:"full"},
        {path: ":id/edit-product", component:EditProductComponent, pathMatch:"full"},
        {path: "", redirectTo:"list", pathMatch:"full"}
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
