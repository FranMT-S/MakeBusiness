import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent,
    children:[
      {
        path:"files",
        loadChildren: () => import('./pages/files/files.module').then(module => module.FilesModule)
      },
      {
        path:"pages",
        loadChildren: () => import('./pages/pages/pages.module').then(module => module.PagesModule)
      },
      {
        path:"products",
        loadChildren: () => import('./pages/products/products.module').then(module => module.ProductsModule)
      },
      {
        path:"web-config",
        loadChildren: () => import('./pages/web-config/web-config.module').then(module => module.WebConfigModule)
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
