import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { StoreModule } from '@ngrx/store';
import { usuarioReducer } from './reducers/usuario.reducers';
import { UsuarioEffects } from './effects/usuario.effects';
import { EffectsModule } from '@ngrx/effects';
import { UsuarioNovoComponent } from './components/usuario-novo/usuario-novo.component';
import { UsuarioStatusComponent } from './components/usuario-status/usuario-status.component';
import { UsuarioPerfilComponent } from './components/usuario-perfil/usuario-perfil.component';
import { usuarioPerfilReducer } from './reducers/usuario-perfil.reducers';
import { UsuarioPerfilEffects } from './effects/usuario-perfil.effects';
import { UsuarioPerfilStatusComponent } from './components/usuario-perfil-status/usuario-perfil-status.component';
import { UsuarioSenhaComponent } from './components/usuario-senha/usuario-senha.component';



@NgModule({
  declarations: [UsuarioComponent, UsuarioNovoComponent, UsuarioStatusComponent, UsuarioPerfilComponent, UsuarioPerfilStatusComponent, UsuarioSenhaComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    UsuarioRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('usuarios', usuarioReducer),
    StoreModule.forFeature('usuarios-perfis', usuarioPerfilReducer),
    EffectsModule.forFeature([UsuarioEffects, UsuarioPerfilEffects])
  ]
})
export class UsuarioModule { }
