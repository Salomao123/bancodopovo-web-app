import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { PerfilFuncionalidadeAcao } from '../../../../models/perfil-funcionalidade-acao';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualizarStatusPerfilFuncionalidadeAcao } from '../../actions/perfil-funcionalidades.action';

@Component({
  selector: 'app-perfil-funcionalidade-status',
  templateUrl: './perfil-funcionalidade-status.component.html',
  styleUrls: ['./perfil-funcionalidade-status.component.scss']
})
export class PerfilFuncionalidadeStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  perfilFuncionalidadeAcao: PerfilFuncionalidadeAcao;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(perfilFuncionalidadeAcao: PerfilFuncionalidadeAcao) {
    this.perfilFuncionalidadeAcao = perfilFuncionalidadeAcao;
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.perfilFuncionalidadeAcao.status) ?
      this.status.INATIVO : this.status.ATIVO;

    this.store.dispatch(atualizarStatusPerfilFuncionalidadeAcao(
      { id: this.perfilFuncionalidadeAcao.id, status, afterSave: this.fecharModal }));
  }

  fecharModal = () => {
    this.modal.close();
  }

}
