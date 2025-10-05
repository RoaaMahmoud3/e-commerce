import { Routes } from "@angular/router";
export const BRANDS_ROUTES:Routes=[
    {path:'brands',loadComponent:()=>import('./pages/brands/brands.component').then(
        (c)=>c.BrandsComponent
    ),title:'Brands'},
]