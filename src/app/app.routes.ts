import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home', canActivate:[authGuard] , component:HomeComponent},
    {path:'brands', canActivate:[authGuard] ,component:BrandsComponent},
    {path:'cart', canActivate:[authGuard] ,component:CartComponent},
    {path:'categories', canActivate:[authGuard] ,component:CategoriesComponent},
    {path:'checkout/:id', canActivate:[authGuard] ,component:CheckoutComponent},
    {path:'login',component:LoginComponent},
    {path:'products', canActivate:[authGuard] ,component:ProductsComponent},
    {path:'productdetails/:id', canActivate:[authGuard] ,component:ProductDetailsComponent},
    {path:'categorydetails/:id', canActivate:[authGuard] ,component:CategoryDetailsComponent},
    {path:'register',component:RegisterComponent},
    {path:'settings', loadChildren:()=> import('./settings/settings.module').then((m)=>m.SettingsModule)},
    {path:'**',component:PageNotFoundComponent},
];
