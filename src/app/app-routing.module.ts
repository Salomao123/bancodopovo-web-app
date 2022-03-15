import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './layout/public/public.component';
import { PUBLIC_ROUTES } from './layout/public/public.routes';
import { PagesComponent } from './layout/pages/pages.component';
import { SECURE_ROUTES } from './layout/pages/pages.routes';
import { AuthGuard } from './guard/auth.guard';
import { AccessGuard } from './guard/access.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { 
    path: 'pages', component: PagesComponent,
    canActivate: [AuthGuard, AccessGuard],
    data: { title: 'Secure Views' }, children: SECURE_ROUTES
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
