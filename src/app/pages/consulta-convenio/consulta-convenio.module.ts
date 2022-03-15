import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaConvenioComponent } from './components/consulta-convenio/consulta-convenio.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { ConsultaConvenioRoutingModule } from './consulta-convenio-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { consultaConvenioReducer } from './reducers/consulta-convenio.reducers';
import { ConsultaConvenioEffects } from './effects/consulta-convenio.effects';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [ConsultaConvenioComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    ConsultaConvenioRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('consulta-convenios', consultaConvenioReducer),
    EffectsModule.forFeature([ConsultaConvenioEffects])
  ]
})
export class ConsultaConvenioModule { }
