import { StatusRegistroEnum } from './../../../../enums/status.registro';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { UsuarioPerfil } from '../../../../models/usuario-perfil';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualizarStatusUsuarioPerfil } from '../../actions/usuario-perfil.action';

@Component({
  selector: 'app-usuario-perfil-status',
  templateUrl: './usuario-perfil-status.component.html',
  styleUrls: ['./usuario-perfil-status.component.scss']
})
export class UsuarioPerfilStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  usuarioPerfil: UsuarioPerfil;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(usuarioPerfil: UsuarioPerfil) {
    this.usuarioPerfil = usuarioPerfil;
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.usuarioPerfil.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualizarStatusUsuarioPerfil({ id: this.usuarioPerfil.id, status }));
    this.modal.close();
  }

}
