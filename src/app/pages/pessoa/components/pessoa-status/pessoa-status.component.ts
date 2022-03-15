import { Component, OnInit, ViewChild } from '@angular/core';
import { Pessoa } from '../../../../models/pessoa';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualiarStatusPessoa } from '../../actions/pessoa.action';
import { ModalComponent } from '../../../../common/components/modal/modal.component';

@Component({
  selector: 'app-pessoa-status',
  templateUrl: './pessoa-status.component.html',
  styleUrls: ['./pessoa-status.component.scss']
})
export class PessoaStatusComponent implements OnInit {

  @ViewChild('modal', {static: false})
  modal: ModalComponent;

  status = StatusRegistroEnum;
  pessoa: Pessoa;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(pessoa: Pessoa) {
    this.pessoa = pessoa;
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.pessoa.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualiarStatusPessoa({ id: this.pessoa.id, status }));
    this.modal.close();
  }

}
