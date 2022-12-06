import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyGuard } from '../guards/validar-rol.guard';
import { HomeComponent } from './home/home.component';
import { EditPageComponent } from './pages/pages/edit-page/edit-page.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent,
    canActivate:[CompanyGuard],canLoad:[CompanyGuard],
    children:[
      {
        path:"files",
        loadChildren: () => import('./pages/files/files.module').then(module => module.FilesModule)
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
  },      {
    path:"pages",
    loadChildren: () => import('./pages/pages/pages.module').then(module => module.PagesModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
