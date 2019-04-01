import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppLayoutComponent } from './share/app-layout/app-layout.component';
import { AuthGuard } from "./auth/auth.guard";
import { ProductsComponent } from './pages/products/products.component';
import { AdministratorComponent } from './pages/administrator/administrator.component';
import { CategoryComponent } from './pages/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomePagesComponent } from './home-pages/home-pages.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { HomesComponent } from './pages/homes/homes.component';
import { DataManagementComponent } from './monk/data-management/data-management.component';
import { PhnomPenhComponent } from './pages/phnom-penh/phnom-penh.component';

const routes: Routes = [
  {path:"",component:HomePagesComponent},
  {path:"homepage",component:HomePagesComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterFormComponent},
  {path:"apps",component:AppLayoutComponent,
  canActivate:[AuthGuard]
  ,children:[
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:AdministratorComponent},
    {path:"monk",component:DataManagementComponent},
    {path:"pagoda",component:CategoryComponent},
    {path:"monkhouse",component:HomesComponent},
    {path:"address",component:PhnomPenhComponent},
  ]},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers:[AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
