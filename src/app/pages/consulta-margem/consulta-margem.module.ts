import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaMargemComponent } from './components/consulta-margem/consulta-margem.component';
import { ConsultaMargemRoutingModule } from './consulta-margem-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { StoreModule } from '@ngrx/store';
import { consultaMargemReducer } from './reducers/consulta-margem.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ConsultaMargemEffects } from './effects/consulta-margem.effects';
import { ContratacaoComponent } from './components/contratacao/contratacao.component';



@NgModule({
  declarations: [ConsultaMargemComponent, ContratacaoComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    ConsultaMargemRoutingModule,

    /**
     * Redux
     */
    StoreModule.forFeature('margens', consultaMargemReducer),
    EffectsModule.forFeature([ConsultaMargemEffects])
  ]
})
export class ConsultaMargemModule { }
