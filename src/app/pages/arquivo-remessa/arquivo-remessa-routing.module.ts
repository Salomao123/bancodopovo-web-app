import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArquivoRemessaComponent } from './components/arquivo-remessa/arquivo-remessa.component';

const routes: Routes = [
    { path: '', component: ArquivoRemessaComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArquivoRemessaRoutingModule { }
