import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Endereco } from '../../../../models/endereco';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualizarStatusEndereco } from '../../actions/endereco.action';

@Component({
  selector: 'app-endereco-status',
  templateUrl: './endereco-status.component.html',
  styleUrls: ['./endereco-status.component.scss']
})
export class EnderecoStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  endereco: Endereco;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(endereco: Endereco) {
    this.endereco = endereco;
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.endereco.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualizarStatusEndereco({ id: this.endereco.id, status }));
    this.modal.close();
  }

}
