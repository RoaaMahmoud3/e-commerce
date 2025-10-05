import { Routes } from "@angular/router";

export const WISHLIST_ROUTES:Routes=[
    {path:'wishlist',loadComponent:()=>import('./pages/wish-list/wish-list.component').then((c)=>
    c.WishListComponent),title:'wishlist'}
]