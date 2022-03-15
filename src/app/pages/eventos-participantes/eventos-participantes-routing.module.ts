import { EventosParticipantesComponent } from './components/eventos-participantes/eventos-participantes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: EventosParticipantesComponent }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventosParticipantesRoutingModule { }
