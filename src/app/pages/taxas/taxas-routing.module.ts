import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TaxasComponent } from './components/taxas/taxas.component';

const routes: Routes = [
    { path: '', component: TaxasComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaxasRoutingModule { }
