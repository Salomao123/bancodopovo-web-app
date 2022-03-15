import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsultaMargemComponent } from './components/consulta-margem/consulta-margem.component';

const routes: Routes = [
    { path: '', component: ConsultaMargemComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsultaMargemRoutingModule { }
