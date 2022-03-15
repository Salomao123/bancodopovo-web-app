import { LevantamentoNovoComponent } from './components/levantamento-novo/levantamento-novo.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: LevantamentoNovoComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LevantamentoNovoRoutingModule { }
