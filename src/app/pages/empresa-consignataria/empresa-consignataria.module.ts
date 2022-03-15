import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaConsignatariaComponent } from './components/empresa-consignataria/empresa-consignataria.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { EmpresaConsignatariaRoutingModule } from './empresa-consignataria-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { empresaConsignatariaReducer } from './reducers/empresa-consignataria.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EmpresaConsignatariaEffects } from './effects/empresa-consignataria.effects';
import { EmpresaConsignatariaNovoComponent } from './components/empresa-consignataria-novo/empresa-consignataria-novo.component';
import { EmpresaConsignatariaStatusComponent } from './components/empresa-consignataria-status/empresa-consignataria-status.component';
import { representanteReducer } from './reducers/representante.reducers';
import { RepresentanteEffects } from './effects/representante.effects';
import { RepresentanteComponent } from './components/representante/representante.component';
import { RepresentanteStatusComponent } from './components/representante-status/representante-status.component';
import { servicoConsignacaoReducer } from './reducers/servico-consignacao.reducers';
import { ServicoConsignacaoEffects } from './effects/servico-consignacao.effects';
import { ServicoConsignacaoComponent } from './components/servico-consignacao/servico-consignacao.component';
import { ServicoConsignacaoStatusComponent } from './components/servico-consignacao-status/servico-consignacao-status.component';



@NgModule({
  declarations: [
    EmpresaConsignatariaComponent,
    EmpresaConsignatariaNovoComponent,
    EmpresaConsignatariaStatusComponent,
    RepresentanteComponent,
    RepresentanteStatusComponent,
    ServicoConsignacaoComponent,
    ServicoConsignacaoStatusComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    EmpresaConsignatariaRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('empresas-consignatarias', empresaConsignatariaReducer),
    StoreModule.forFeature('representantes', representanteReducer),
    StoreModule.forFeature('servicos-consignacao', servicoConsignacaoReducer),
    // StoreModule.forFeature('usuarios-perfis', usuarioPerfilReducer),
    EffectsModule.forFeature([EmpresaConsignatariaEffects, RepresentanteEffects, ServicoConsignacaoEffects])
  ]
})
export class EmpresaConsignatariaModule { }
