import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Representante } from '../../../../models/representante';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualizarStatusRepresentante } from '../../actions/representante.actions';

@Component({
  selector: 'app-representante-status',
  templateUrl: './representante-status.component.html',
  styleUrls: ['./representante-status.component.scss']
})
export class RepresentanteStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  representante: Representante;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(representante: Representante) {
    this.representante = representante;
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.representante.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualizarStatusRepresentante({ id: this.representante.id, status }));
    this.modal.close();
  }

}
