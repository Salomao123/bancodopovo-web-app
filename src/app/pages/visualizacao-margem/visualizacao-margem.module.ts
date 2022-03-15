import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizacaoMargemComponent } from './components/visualizacao-margem/visualizacao-margem.component';
import { VisualizacaoMargemRoutingModule } from './visualizacao-margem-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { StoreModule } from '@ngrx/store';
import { visualizacaoMargemReducer } from './reducers/visualizacao-margem.reducers';
import { EffectsModule } from '@ngrx/effects';
import { VisualizacaoMargemEffects } from './effects/visualizacao-margem.effects';
import { VisualizacaoMargemSituacaoComponent } from './components/visualizacao-margem-situacao/visualizacao-margem-situacao.component';



@NgModule({
  declarations: [VisualizacaoMargemComponent, VisualizacaoMargemSituacaoComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    VisualizacaoMargemRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,
    StoreModule.forFeature('visualizacoes-margens', visualizacaoMargemReducer),
    EffectsModule.forFeature([VisualizacaoMargemEffects])
  ]
})
export class VisualizacaoMargemModule { }
