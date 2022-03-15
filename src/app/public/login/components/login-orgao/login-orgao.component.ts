import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from '../../../../models/usuario.login';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { NgForm } from '@angular/forms';
import { efetuarLoginAction, esqueciSenhaAction } from '../../actions/login.actions';
import { TipoUsuarioEnum } from '../../../../enums/tipo.usuario';

@Component({
  selector: 'app-login-orgao',
  templateUrl: './login-orgao.component.html',
  styleUrls: ['./login-orgao.component.scss']
})
export class LoginOrgaoComponent implements OnInit {

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
      tipoUsuario: TipoUsuarioEnum.CONSIGNATARIO
    }));
  }

  trocarSenha() {
    this.store.dispatch(esqueciSenhaAction({ tipo: TipoUsuarioEnum.CONSIGNATARIO }));
  }
}
