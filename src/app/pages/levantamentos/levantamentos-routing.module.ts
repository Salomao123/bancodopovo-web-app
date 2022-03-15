import { LevantamentosComponent } from './components/levantamentos/levantamentos.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: LevantamentosComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LevantamentosRoutingModule { }
