import { LinhasCreditoRoutingModule } from './linhas-credito-routing.module';
import { ComponentsModule } from './../../common/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinhasCreditoComponent } from './components/linhas-credito/linhas-credito.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { linhasCreditoReducer } from './reducers/linhas-credito.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LinhasCreditoEffects } from './effects/linhas-credito.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinhasCreditoNovoComponent } from './components/linhas-credito-novo/linhas-credito-novo.component';
import { DirectivesModule } from '../../common/directives/directives.module';

import {
  MatAutocompleteModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [LinhasCreditoComponent, LinhasCreditoNovoComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    LinhasCreditoRoutingModule,
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
    StoreModule.forFeature('linhas-credito', linhasCreditoReducer),
    EffectsModule.forFeature([LinhasCreditoEffects])
  ]
})
export class LinhasCreditoModule { }
