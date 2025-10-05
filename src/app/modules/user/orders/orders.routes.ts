import { Routes } from "@angular/router";

export const ORDERS_ROUTES:Routes=[
    {path:'checkout/:id',loadComponent:()=>import('./pages/checkout/checkout.component').then(
        (c)=>c.CheckoutComponent
    ) , title:'Checkout'},
    {path:'allorders',loadComponent:()=>import('./pages/allorders/allorders.component').then(
        (c)=>c.AllordersComponent
    ) , title:'All Orders'},
]