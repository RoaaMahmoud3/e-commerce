import { Routes } from "@angular/router";


export const CATEGORIES_ROUTES:Routes=[
    {path:'categories',loadComponent:()=>import('./pages/categories/categories.component').then(
        (c)=>c.CategoriesComponent
    ) , title:'Categories'}
]