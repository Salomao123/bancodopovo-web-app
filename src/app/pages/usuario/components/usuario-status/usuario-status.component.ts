import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Usuario } from '../../../../models/usuario';
import { AppState } from '../../../../reducers/index';
import { Store } from '@ngrx/store';
import { atualizarStatusUsuario } from '../../actions/usuario.action';

@Component({
  selector: 'app-usuario-status',
  templateUrl: './usuario-status.component.html',
  styleUrls: ['./usuario-status.component.scss']
})
export class UsuarioStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  usuario: Usuario;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(usuario: Usuario) {
    this.usuario = usuario;
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.usuario.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualizarStatusUsuario({ id: this.usuario.id, status }));
    this.modal.close();
  }

}
