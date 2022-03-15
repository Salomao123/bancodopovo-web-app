import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../../models/usuario';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { enviarEmailCadastro } from '../../actions/usuario.action';

@Component({
  selector: 'app-usuario-senha',
  templateUrl: './usuario-senha.component.html',
  styleUrls: ['./usuario-senha.component.scss']
})
export class UsuarioSenhaComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  usuario: Usuario;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(usuario: Usuario) {
    this.usuario = usuario;
    this.modal.open();
  }

  salvar() {
    this.store.dispatch(enviarEmailCadastro({ idUsuario: this.usuario.id }));
    this.modal.close();
  }

}
