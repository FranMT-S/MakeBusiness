import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { MaterialModule } from 'src/app/material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    ListProductsComponent,
    
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
