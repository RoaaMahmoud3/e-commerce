import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';


export const routes: Routes = [
    {path:'',loadChildren:()=>import('./modules/auth/auth.routes').then((m)=>m.AUTH_ROUTES)
        ,title:'Auth' ,canActivate:[isLoggedInGuard]},
    {path:'',loadChildren:()=>import('./modules/user/user.routes').then((m)=>m.USER_ROUTES)
        ,title:'User' , canActivate:[authGuard]},
    {path:'**',loadComponent:()=>import('./shared/components/not-found/not-found.component').then((c)=>c.NotFoundComponent)}
];
