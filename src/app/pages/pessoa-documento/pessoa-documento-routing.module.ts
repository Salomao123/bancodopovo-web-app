import { PessoaDocumentoComponent } from './components/pessoa-documento/pessoa-documento.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: PessoaDocumentoComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PessoaDocumentoRoutingModule { }
