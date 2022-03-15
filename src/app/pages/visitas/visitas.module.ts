import { VisitasRoutingModule } from './visitas-routing.module';
import { ComponentsModule } from './../../common/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitasComponent } from './components/visitas/visitas.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { visitasReducer } from './reducers/visitas.reducers';
import { EffectsModule } from '@ngrx/effects';
import { VisitasEffects } from './effects/visitas.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisitasNovoComponent } from './components/visitas-novo/visitas-novo.component';
import { VisitasStatusComponent } from './components/visitas-status/visitas-status.component';
import { DirectivesModule } from '../../common/directives/directives.module';

import {
  MatAutocompleteModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [VisitasComponent, VisitasNovoComponent, VisitasStatusComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    VisitasRoutingModule,
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
    StoreModule.forFeature('visitas', visitasReducer),
    EffectsModule.forFeature([VisitasEffects])
  ]
})
export class VisitasModule { }
