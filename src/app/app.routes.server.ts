import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {path:'home', renderMode:RenderMode.Server},
  {path:'product-details/:id', renderMode:RenderMode.Server},
  {path:'products', renderMode:RenderMode.Server},
  {path:'categories', renderMode:RenderMode.Server},
  {path:'brands', renderMode:RenderMode.Server},
  {path:'allorders', renderMode:RenderMode.Server},
  {path:'wishlist', renderMode:RenderMode.Server},
  {path:'cart', renderMode:RenderMode.Server},
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
