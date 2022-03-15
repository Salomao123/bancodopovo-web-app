import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './component/home-admin/home-admin.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: HomeAdminComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeAdminRoutingModule { }
