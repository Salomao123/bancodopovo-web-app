import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeConsignatarioComponent } from './components/home-consignatario/home-consignatario.component';

const routes: Routes = [
    { path: '', component: HomeConsignatarioComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeConsignatarioRoutingModule { }
