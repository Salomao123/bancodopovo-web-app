import { Routes, RouterModule } from '@angular/router';
import { HomeConsignadoComponent } from './component/home-consignado/home-consignado.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: HomeConsignadoComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeConsignadoRoutingModule { }
