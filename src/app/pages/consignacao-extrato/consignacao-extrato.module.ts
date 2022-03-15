import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtratoComponent } from './components/extrato/extrato.component';
import { DirectivesModule } from '../../common/directives/directives.module';
import { ComponentsModule } from '../../common/components/components.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { consignacaoExtratoReducer } from './reducers/consignacao-extrato.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ConsignacaoExtratoEffects } from './effects/consignacao-extrato.effects';
import { ConsignacaoExtratoRoutingModule } from './consignacao-extrato-routing.module';
import { parcelaExtratoReducer } from './reducers/parcela-extrato.reducers';
import { ExtratoParcelasComponent } from './components/extrato-parcelas/extrato-parcelas.component';
import { ParcelaExtratoEffects } from './effects/parcela-extrato.effects';



@NgModule({
  declarations: [ExtratoComponent, ExtratoParcelasComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    ConsignacaoExtratoRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('consignacao-extrato', consignacaoExtratoReducer),
    StoreModule.forFeature('parcela-extrato', parcelaExtratoReducer),
    EffectsModule.forFeature([ConsignacaoExtratoEffects, ParcelaExtratoEffects])
  ]
})
export class ConsignacaoExtratoModule { }
