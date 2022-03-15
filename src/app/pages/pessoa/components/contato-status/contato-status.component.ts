import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Contato } from '../../../../models/contato';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualizarStatusContato } from '../../actions/contato.action';

@Component({
  selector: 'app-contato-status',
  templateUrl: './contato-status.component.html',
  styleUrls: ['./contato-status.component.scss']
})
export class ContatoStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  contato: Contato;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(contato: Contato) {
    this.contato = contato;
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.contato.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualizarStatusContato({ id: this.contato.id, status }));
    this.modal.close();
  }

}
