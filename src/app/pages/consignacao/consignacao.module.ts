import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsignacaoComponent } from './components/consignacao/consignacao.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DirectivesModule } from '../../common/directives/directives.module';
import { ComponentsModule } from '../../common/components/components.module';
import { FormsModule } from '@angular/forms';
import { ConsignacaoRoutingModule } from './consignacao-routing.module';
import { StoreModule } from '@ngrx/store';
import { consignacaoReducer } from './reducers/consignacao.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ConsignacaoEffects } from './effects/consignacao.effects';
import { ConsignacaoDetalheComponent } from './components/consignacao-detalhe/consignacao-detalhe.component';
import { ConsignacaoEncerramentoComponent } from './components/consignacao-encerramento/consignacao-encerramento.component';
import { ConsignacaoRenovacaoComponent } from './components/consignacao-renovacao/consignacao-renovacao.component';
import { ConsignacaoSuspensaoComponent } from './components/consignacao-suspensao/consignacao-suspensao.component';
import { ConsignacaoSuspensaoCancelamentoComponent } from './components/consignacao-suspensao-cancelamento/consignacao-suspensao-cancelamento.component';



@NgModule({
  declarations: [ConsignacaoComponent, ConsignacaoDetalheComponent, ConsignacaoEncerramentoComponent, ConsignacaoRenovacaoComponent, ConsignacaoSuspensaoComponent, ConsignacaoSuspensaoCancelamentoComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    ConsignacaoRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('consignacoes', consignacaoReducer),
    EffectsModule.forFeature([ConsignacaoEffects])
  ]
})
export class ConsignacaoModule { }
