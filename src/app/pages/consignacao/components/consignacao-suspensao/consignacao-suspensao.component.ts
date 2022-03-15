import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { ModalConfirmacaoComponent } from '../../../../common/components/modal-confirmacao/modal-confirmacao.component';
import { Observable } from 'rxjs';
import { Proposta } from '../../../../models/proposta';
import { selectPropostaConsignacao } from '../../selectors/consignacao.selectors';
import { NgForm } from '@angular/forms';
import { detalharPropostaConsignacaoSucesso, salvarSuspensaoPropostaConsignacao } from '../../actions/consignacao.actions';
import { SimNaoEnum } from '../../../../enums/sim.nao';

@Component({
  selector: 'app-consignacao-suspensao',
  templateUrl: './consignacao-suspensao.component.html',
  styleUrls: ['./consignacao-suspensao.component.scss']
})
export class ConsignacaoSuspensaoComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('confirmacao', { static: false })
  confirmacao: ModalConfirmacaoComponent;

  @ViewChild('consignacaoSuspensaoForm', { static: false })
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
    this.proposta = new Proposta();

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
    this.store.dispatch(salvarSuspensaoPropostaConsignacao({ proposta: this.proposta, file: this.file, afterSalvar: this.close }));
  }

}
