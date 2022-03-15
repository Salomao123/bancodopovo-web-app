import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SimuladorComponent } from './components/simulador/simulador.component';

const routes: Routes = [
    { path: '', component: SimuladorComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SimuladorRoutingModule { }
