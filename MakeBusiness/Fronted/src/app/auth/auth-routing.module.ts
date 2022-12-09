import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarNotAuth } from '../guards/validar-NotAuth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { 
        path: 'login', component: 
        LoginComponent,pathMatch:"full",
        canActivate:[ValidarNotAuth],
        canLoad:[ValidarNotAuth]
    
    },
    { path: '', redirectTo: "login", pathMatch: "full"},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
