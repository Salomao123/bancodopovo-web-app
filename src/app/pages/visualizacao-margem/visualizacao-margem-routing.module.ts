import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VisualizacaoMargemComponent } from './components/visualizacao-margem/visualizacao-margem.component';

const routes: Routes = [
    { path: '', component: VisualizacaoMargemComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisualizacaoMargemRoutingModule { }
