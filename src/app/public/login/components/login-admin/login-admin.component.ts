import { AppState } from './../../../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from '../../../../models/usuario.login';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { efetuarLoginAction, esqueciSenhaAction } from '../../actions/login.actions';
import { TipoUsuarioEnum } from 'src/app/enums/tipo.usuario';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  usuarioLogin: UsuarioLogin;

  constructor(private store: Store<AppState>) {
    this.usuarioLogin = new UsuarioLogin();
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    localStorage.removeItem('cng_at');
    this.store.dispatch(efetuarLoginAction({
      usuarioLogin: Object.assign({}, this.usuarioLogin),
      tipoUsuario: TipoUsuarioEnum.ADMINISTRADOR
    }));
  }

  trocarSenha() {
    this.store.dispatch(esqueciSenhaAction({ tipo: TipoUsuarioEnum.ADMINISTRADOR }));
  }

}
