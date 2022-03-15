import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpregadoConsignanteComponent } from './components/empregado-consignante/empregado-consignante.component';
import { EmpregadoConsignanteRoutingModule } from './empregado-consignante-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { empregadoConsignanteReducer } from './reducers/empregado-consignante.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EmpregadoConsignanteNovoComponent } from './components/empregado-consignante-novo/empregado-consignante-novo.component';
import { EmpregadoConsignanteEffects } from './effects/empregado-consignante.effects';
import { EmpregadoConsignanteStatusComponent } from './components/empregado-consignante-status/empregado-consignante-status.component';

@NgModule({
  declarations: [EmpregadoConsignanteComponent, EmpregadoConsignanteNovoComponent, EmpregadoConsignanteStatusComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    EmpregadoConsignanteRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('empregados-consignantes', empregadoConsignanteReducer),
    EffectsModule.forFeature([EmpregadoConsignanteEffects])
  ]
})
export class EmpregadoConsignanteModule { }
