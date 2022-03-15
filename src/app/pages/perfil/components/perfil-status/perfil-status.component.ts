import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Perfil } from '../../../../models/perfil';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualiarStatusPerfil } from '../../actions/perfil.actions';

@Component({
  selector: 'app-perfil-status',
  templateUrl: './perfil-status.component.html',
  styleUrls: ['./perfil-status.component.scss']
})
export class PerfilStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  perfil: Perfil;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(perfil: Perfil) {
    this.perfil = perfil;
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.perfil.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualiarStatusPerfil({ id: this.perfil.id, status, afterSave: this.fecharModal }));
  }

  fecharModal = () => {
    this.modal.close();
  }

}
