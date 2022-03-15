import { EventosParticipantesRoutingModule } from './eventos-participantes-routing.module';
import { ComponentsModule } from './../../common/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosParticipantesComponent } from './components/eventos-participantes/eventos-participantes.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { participantesReducer } from './reducers/participantes.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ParticipantesEffects } from './effects/participantes.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../common/directives/directives.module';

import {
  MatAutocompleteModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [EventosParticipantesComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    EventosParticipantesRoutingModule,
    MatAutocompleteModule,
    MatInputModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('participantes', participantesReducer),
    EffectsModule.forFeature([ParticipantesEffects])
  ]
})
export class EventosParticipantesModule { }
