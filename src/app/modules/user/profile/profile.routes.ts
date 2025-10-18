import { Routes } from "@angular/router";


export const PROFILE_ROUTES:Routes=[
    {path:'user-profile',loadComponent:()=>import('./pages/user-profile/user-profile.component').then(
        (c)=>c.UserProfileComponent
    ) , title:'Profile page'}
]