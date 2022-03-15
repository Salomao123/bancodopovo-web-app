import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmpresaComponent } from './components/empresa/empresa.component';

const routes: Routes = [
    { path: '', component: EmpresaComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresaRoutingModule { }
