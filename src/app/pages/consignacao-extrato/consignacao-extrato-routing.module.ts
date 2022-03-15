import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExtratoComponent } from './components/extrato/extrato.component';

const routes: Routes = [
    { path: '', component: ExtratoComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsignacaoExtratoRoutingModule { }
