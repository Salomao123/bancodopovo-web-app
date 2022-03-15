import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { ModalConfirmacaoComponent } from '../../../../common/components/modal-confirmacao/modal-confirmacao.component';
import { Proposta } from '../../../../models/proposta';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectPropostaConsignacao } from '../../selectors/consignacao.selectors';
import { detalharPropostaConsignacaoSucesso, salvarEncerramentoPropostaConsignacao } from '../../actions/consignacao.actions';
import { BaseComponent } from '../../../base.components';

@Component({
  selector: 'app-consignacao-encerramento',
  templateUrl: './consignacao-encerramento.component.html',
  styleUrls: ['./consignacao-encerramento.component.scss']
})
export class ConsignacaoEncerramentoComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', {static: false})
  modal: ModalComponent;

  @ViewChild('confirmacao', { static: false })
  confirmacao: ModalConfirmacaoComponent;

  file: File;

  proposta$: Observable<Proposta>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.proposta$ = this.store.pipe(select(selectPropostaConsignacao));
  }

  carregar() {
    this.file = undefined;
    this.modal.open();
  }

  fechar() {
    this.store.dispatch(detalharPropostaConsignacaoSucesso({ proposta: undefined, afterDetalhar: this.close }));
  }

  close = () => {
    this.file = undefined;
    this.modal.close();
  }

  selectFile(event) {
    this.file = event.target.files[0];
  }

  salvar(id: number) {
    if (!this.file) {
      super.addMessageError({error: { message: 'O anexo é obrigatório' }});
    } else {

      this.store.dispatch(salvarEncerramentoPropostaConsignacao({ id, file: this.file, afterSalvar: this.close }));
    }
  }
}
