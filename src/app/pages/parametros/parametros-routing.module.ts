import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ParametrosComponent } from './components/parametros/parametros.component';

const routes: Routes = [
    { path: '', component: ParametrosComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParametrosRoutingModule { }
