import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxasComponent } from './components/taxas/taxas.component';
import { TaxasRoutingModule } from './taxas-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { taxasReducer } from './reducers/taxas.reducers';
import { EffectsModule } from '@ngrx/effects';
import { TaxasEffects } from './effects/taxas.effects';
import { taxasParcelasReducer } from './reducers/taxas-parcelas.reducers';
import { TaxasParcelasEffects } from './effects/taxas-parcelas.effects';



@NgModule({
  declarations: [TaxasComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    TaxasRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('taxas', taxasReducer),
    StoreModule.forFeature('taxas-parcelas', taxasParcelasReducer),
    EffectsModule.forFeature([TaxasEffects, TaxasParcelasEffects])
  ]
})
export class TaxasModule { }
