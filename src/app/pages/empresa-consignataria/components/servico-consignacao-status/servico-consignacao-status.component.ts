import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { ServicoConsignacao } from '../../../../models/servico-consignacao';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualizarStatusServicoConsignacao } from '../../actions/servico-consignacao.actions';

@Component({
  selector: 'app-servico-consignacao-status',
  templateUrl: './servico-consignacao-status.component.html',
  styleUrls: ['./servico-consignacao-status.component.scss']
})
export class ServicoConsignacaoStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  servicoConsignacao: ServicoConsignacao;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(servicoConsignacao: ServicoConsignacao) {
    this.servicoConsignacao = servicoConsignacao;
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.servicoConsignacao.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualizarStatusServicoConsignacao({ id: this.servicoConsignacao.id, status }));
    this.modal.close();
  }
}
