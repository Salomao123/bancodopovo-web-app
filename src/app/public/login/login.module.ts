import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromLogin from './reducers/login.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './effects/login.effects';
import { LoginRoutingModule } from './login-routing.module';
import { LoginOrgaoComponent } from './components/login-orgao/login-orgao.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';

@NgModule({
  declarations: [
    LoginOrgaoComponent,
    LoginAdminComponent,
    AlterarSenhaComponent,
    EsqueciSenhaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,

    /** NGRX Store */
    StoreModule.forFeature('login', fromLogin.loginReducer),
    EffectsModule.forFeature([LoginEffects])
  ]
})
export class LoginModule {}
