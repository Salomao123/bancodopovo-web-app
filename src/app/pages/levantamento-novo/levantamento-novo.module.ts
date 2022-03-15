import { LevantamentoNovoRoutingModule } from './levantamento-novo-routing.module';
import { ComponentsModule } from './../../common/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevantamentoNovoComponent } from './components/levantamento-novo/levantamento-novo.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { levantamentosReducer } from './reducers/levantamento-novo.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LevantamentoNovoEffects } from './effects/levantamento-novo.effects';
import { DirectivesModule } from '../../common/directives/directives.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatAutocompleteModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [LevantamentoNovoComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    LevantamentoNovoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
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
    StoreModule.forFeature('levantamentoNovo', levantamentosReducer),
    EffectsModule.forFeature([LevantamentoNovoEffects])
  ],
  exports: [ MatAutocompleteModule, MatInputModule],
})
export class LevantamentoNovoModule { }
