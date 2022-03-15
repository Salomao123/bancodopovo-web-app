import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { ModalConfirmacaoComponent } from '../../../../common/components/modal-confirmacao/modal-confirmacao.component';
import { NgForm } from '@angular/forms';
import { SimNaoEnum } from '../../../../enums/sim.nao';
import { Proposta } from '../../../../models/proposta';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectPropostaConsignacao } from '../../selectors/consignacao.selectors';
import { detalharPropostaConsignacaoSucesso, salvarCancelamentoSuspensaoPropostaConsignacao } from '../../actions/consignacao.actions';

@Component({
  selector: 'app-consignacao-suspensao-cancelamento',
  templateUrl: './consignacao-suspensao-cancelamento.component.html',
  styleUrls: ['./consignacao-suspensao-cancelamento.component.scss']
})
export class ConsignacaoSuspensaoCancelamentoComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('confirmacao', { static: false })
  confirmacao: ModalConfirmacaoComponent;

  @ViewChild('consignacaoCancelamentoSuspensaoForm', { static: false })
  form: NgForm;

  simNao = SimNaoEnum;

  file: File;

  proposta: Proposta;
  proposta$: Observable<Proposta>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.proposta$ = this.store.pipe(select(selectPropostaConsignacao));
  }

  carregar() {
    this.file = undefined;
    this.proposta = new Proposta();

    this.modal.open();
  }

  fechar() {
    this.store.dispatch(detalharPropostaConsignacaoSucesso({ proposta: undefined, afterDetalhar: this.close }));
  }

  close = () => {
    this.file = undefined;
    this.proposta = undefined;

    this.form.resetForm();
    this.modal.close();
  }

  selectFile(event) {
    this.file = event.target.files[0];
  }

  salvar(id: number) {
    if (this.form.valid) {
      this.proposta.id = id;
      this.confirmacao.open();
    }
  }

  confirmar = () => {
    this.store.dispatch(salvarCancelamentoSuspensaoPropostaConsignacao(
      { proposta: this.proposta, file: this.file, afterSalvar: this.close }));
  }

}
