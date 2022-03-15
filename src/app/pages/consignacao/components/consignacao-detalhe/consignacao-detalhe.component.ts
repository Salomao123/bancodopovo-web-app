import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proposta } from '../../../../models/proposta';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectPropostaConsignacao } from '../../selectors/consignacao.selectors';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { detalharPropostaConsignacaoSucesso, salvarAlteracaoPropostaConsignacao } from '../../actions/consignacao.actions';
import { FormatadoresUtil } from '../../../../util/formatadores';
import { ModalConfirmacaoComponent } from '../../../../common/components/modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-consignacao-detalhe',
  templateUrl: './consignacao-detalhe.component.html',
  styleUrls: ['./consignacao-detalhe.component.scss']
})
export class ConsignacaoDetalheComponent implements OnInit {

  @ViewChild('modal', {static: false})
  modal: ModalComponent;

  @ViewChild('confirmacao', { static: false })
  confirmacao: ModalConfirmacaoComponent;

  proposta$: Observable<Proposta>;

  novoParcelas: number;
  novoValor: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.proposta$ = this.store.pipe(select(selectPropostaConsignacao));
  }

  carregar() {
    this.novoParcelas = undefined;
    this.novoValor = undefined;

    this.modal.open();
  }

  fechar() {
    this.store.dispatch(detalharPropostaConsignacaoSucesso({ proposta: undefined, afterDetalhar: this.close }));
  }

  close = () => {
    this.modal.close();
  }

  salvar(form: NgForm, id: number) {
    if (form.valid) {
      const proposta = new Proposta();
      proposta.id = id;

      proposta.valorParcela = FormatadoresUtil.parseMoeda(this.novoValor);
      proposta.parcelas = this.novoParcelas;

      this.store.dispatch(salvarAlteracaoPropostaConsignacao({ proposta, afterSalvar: this.close }));
    }
  }

}
