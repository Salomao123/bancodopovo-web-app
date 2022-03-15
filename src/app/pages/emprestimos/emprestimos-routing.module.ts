import { EmprestimosComponent } from './components/emprestimos/emprestimos.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: EmprestimosComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmprestimosRoutingModule { }
