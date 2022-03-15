import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { PerfilRoutingModule } from './perfil-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { perfilReducer } from './reducers/perfil.reducers';
import { PerfilEffects } from './effects/perfil.effects';
import { EffectsModule } from '@ngrx/effects';
import { PerfilNovoComponent } from './components/perfil-novo/perfil-novo.component';
import { PerfilStatusComponent } from './components/perfil-status/perfil-status.component';
import { PerfilFuncionalidadeComponent } from './components/perfil-funcionalidade/perfil-funcionalidade.component';
import { perfilFuncionalidadesReducer } from './reducers/perfil-funcionalidades.reducers';
import { PerfilFuncionalidadesEffects } from './effects/perfil-funcionalidades.effects';
import { PerfilFuncionalidadeStatusComponent } from './components/perfil-funcionalidade-status/perfil-funcionalidade-status.component';



@NgModule({
  declarations: [PerfilComponent, PerfilNovoComponent, PerfilStatusComponent, PerfilFuncionalidadeComponent, PerfilFuncionalidadeStatusComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    PerfilRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('perfis', perfilReducer),
    StoreModule.forFeature('perfisFuncionalidades', perfilFuncionalidadesReducer),
    EffectsModule.forFeature([PerfilEffects, PerfilFuncionalidadesEffects])
  ]
})
export class PerfilModule { }
