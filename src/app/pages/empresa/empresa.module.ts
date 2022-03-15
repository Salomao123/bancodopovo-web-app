import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { empresaReducer } from './reducers/empresa.reducers';
import { EmpresaEffects } from './effects/empresa.effects';
import { EffectsModule } from '@ngrx/effects';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaNovoComponent } from './components/empresa-novo/empresa-novo.component';
import { EmpresaStatusComponent } from './components/empresa-status/empresa-status.component';
import { ConvenioComponent } from './components/convenio/convenio.component';
import { convenioReducer } from './reducers/convenio.reducers';
import { ConvenioEffects } from './effects/convenio.effects';
import { ConvenioStatusComponent } from './components/convenio-status/convenio-status.component';



@NgModule({
  declarations: [EmpresaComponent, EmpresaNovoComponent, EmpresaStatusComponent, ConvenioComponent, ConvenioStatusComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    EmpresaRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('empresas', empresaReducer),
    StoreModule.forFeature('convenios', convenioReducer),
    EffectsModule.forFeature([EmpresaEffects, ConvenioEffects])
  ]
})
export class EmpresaModule { }
