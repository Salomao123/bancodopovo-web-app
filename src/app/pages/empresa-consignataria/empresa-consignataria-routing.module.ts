import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmpresaConsignatariaComponent } from './components/empresa-consignataria/empresa-consignataria.component';

const routes: Routes = [
    { path: '', component: EmpresaConsignatariaComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresaConsignatariaRoutingModule { }
