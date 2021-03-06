import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsultaConvenioComponent } from './components/consulta-convenio/consulta-convenio.component';

const routes: Routes = [
    { path: '', component: ConsultaConvenioComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsultaConvenioRoutingModule { }
