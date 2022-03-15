import { LinhasCreditoComponent } from './components/linhas-credito/linhas-credito.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: LinhasCreditoComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LinhasCreditoRoutingModule { }
