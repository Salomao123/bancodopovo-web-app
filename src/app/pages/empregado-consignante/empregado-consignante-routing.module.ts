import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmpregadoConsignanteComponent } from './components/empregado-consignante/empregado-consignante.component';

const routes: Routes = [
    { path: '', component: EmpregadoConsignanteComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpregadoConsignanteRoutingModule { }
