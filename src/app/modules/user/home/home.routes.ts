import { Routes } from "@angular/router";

export const HOME_ROUTES:Routes=[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadComponent:()=>import('./pages/home/home.component').then(
        (c)=>c.HomeComponent), title:'Home'}
]