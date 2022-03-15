import { EventosRoutingModule } from './eventos-routing.module';
import { ComponentsModule } from './../../common/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosComponent } from './components/eventos/eventos.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { eventosReducer } from './reducers/eventos.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EventosEffects } from './effects/eventos.effects';
import { FormsModule } from '@angular/forms';
import { EventosNovoComponent } from './components/eventos-novo/eventos-novo.component';
import { EventosCanceladoComponent } from './components/eventos-cancelado/eventos-cancelado.component';
import { EventosRealizadoComponent } from './components/eventos-realizado/eventos-realizado.component';
import { DirectivesModule } from '../../common/directives/directives.module';


@NgModule({
  declarations: [EventosComponent, EventosNovoComponent, EventosCanceladoComponent, EventosRealizadoComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    EventosRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('eventos', eventosReducer),
    EffectsModule.forFeature([EventosEffects])
  ]
})
export class EventosModule { }
