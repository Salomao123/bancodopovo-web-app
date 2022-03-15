import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimuladorComponent } from './components/simulador/simulador.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { SimuladorRoutingModule } from './simulador-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { simuladorReducer } from './reducers/simulador.reducers';
import { EffectsModule } from '@ngrx/effects';
import { SimuladorEffects } from './effects/simulador.effects';
import { SimuladorDetalheComponent } from './components/simulador-detalhe/simulador-detalhe.component';

@NgModule({
  declarations: [SimuladorComponent, SimuladorDetalheComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    SimuladorRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('simulador', simuladorReducer),
    EffectsModule.forFeature([SimuladorEffects])
  ]
})
export class SimuladorModule { }
