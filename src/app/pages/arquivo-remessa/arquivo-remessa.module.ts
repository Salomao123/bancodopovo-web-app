import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquivoRemessaComponent } from './components/arquivo-remessa/arquivo-remessa.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { arquivoRemessaReducer } from './reducers/arquivo-remessa.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ArquivoRemessaEffects } from './effects/arquivo-remessa.effects';
import { ArquivoRemessaRoutingModule } from './arquivo-remessa-routing.module';
import { ArquivoRetornoComponent } from './components/arquivo-retorno/arquivo-retorno.component';



@NgModule({
  declarations: [ArquivoRemessaComponent, ArquivoRetornoComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    ArquivoRemessaRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('arquivos-remessa', arquivoRemessaReducer),
    EffectsModule.forFeature([ArquivoRemessaEffects])
  ]
})
export class ArquivoRemessaModule { }
