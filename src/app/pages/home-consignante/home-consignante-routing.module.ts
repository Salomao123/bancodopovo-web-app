import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeConsignanteComponent } from './components/home-consignante/home-consignante.component';

const routes: Routes = [
    { path: '', component: HomeConsignanteComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeConsignanteRoutingModule { }
