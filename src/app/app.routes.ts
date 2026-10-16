import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';
import { Register } from './components/register/register';
import { Product } from './components/product/product';
import { Detailes } from './components/detailes/detailes';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
    {path:'login',component : Login},
    
    {path:'',redirectTo : 'home',pathMatch : 'full'},
    {path:'home',component : Home},
    {path:'register',component : Register},
    {path:'product',component : Product},
    {path:'cart',component : Cart},
    {path:'details/:id',component : Detailes},
    {path:"**",component : NotFound},
];
