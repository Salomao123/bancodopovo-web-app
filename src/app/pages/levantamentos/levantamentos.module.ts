import { LevantamentosRoutingModule } from './levantamentos-routing.module';
import { ComponentsModule } from './../../common/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LevantamentosComponent } from './components/levantamentos/levantamentos.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { levantamentosReducer } from './reducers/levantamentos.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LevantamentosEffects } from './effects/levantamentos.effects';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../common/directives/directives.module';


@NgModule({
  declarations: [LevantamentosComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    LevantamentosRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('levantamentos', levantamentosReducer),
    EffectsModule.forFeature([LevantamentosEffects])
  ]
})
export class LevantamentosModule { }
