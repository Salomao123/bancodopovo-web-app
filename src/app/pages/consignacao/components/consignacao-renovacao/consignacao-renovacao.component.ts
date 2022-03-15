import { Component, OnInit, ViewChild } from '@angular/core';
import { Proposta } from '../../../../models/proposta';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectConsignadoByMatricula } from '../../selectors/consignacao.selectors';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { ModalConfirmacaoComponent } from '../../../../common/components/modal-confirmacao/modal-confirmacao.component';
import { NgForm } from '@angular/forms';
import { salvarRenovacaoPropostaConsignacao } from '../../actions/consignacao.actions';
import { PropostaRenovacaoVo } from '../../../../vo/proposta-renovacao.vo';
import { FormatadoresUtil } from '../../../../util/formatadores';
import { EmpregadoConsignante } from '../../../../models/empregado-consignante';

@Component({
  selector: 'app-consignacao-renovacao',
  templateUrl: './consignacao-renovacao.component.html',
  styleUrls: ['./consignacao-renovacao.component.scss']
})
export class ConsignacaoRenovacaoComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('confirmacao', { static: false })
  confirmacao: ModalConfirmacaoComponent;

  @ViewChild('consignacaoRenovacaoForm', { static: false })
  form: NgForm;

  proposta: Proposta;
  margemDisponivel: number;
  file: File;

  valorFormatado: string;
  idsPropostasSelecionadas: number[];

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
  }

  carregar(propostasSelecionadas: Proposta[], consignado: EmpregadoConsignante) {
    this.proposta = new Proposta();
    this.proposta.empregadoConsignante = consignado;
    this.proposta.servicoConsignacao = propostasSelecionadas[0].servicoConsignacao;

    let margem = consignado.valorMargem;

    for (const p of propostasSelecionadas) {
      margem  = margem + p.valorParcela;
    }

    this.margemDisponivel = margem;

    this.idsPropostasSelecionadas = propostasSelecionadas.map(ps => ps.id);
    this.modal.open();
  }

  selectFile(event) {
    this.file = event.target.files[0];
  }

  salvar() {
    if (this.form.valid) {
      this.proposta.valorParcela = FormatadoresUtil.parseMoeda(this.valorFormatado);

      if (this.proposta.valorParcela > this.margemDisponivel) {
        super.addMessageError({ error: { message: 'O valor da parcela não pode ser superior a margem.' } });
      } else {

        this.confirmacao.open();
      }
    }
  }

  confirmar = () => {
    const propostaRenovacaoVo = new PropostaRenovacaoVo();
    propostaRenovacaoVo.proposta = this.proposta;
    propostaRenovacaoVo.idsPropostasRenegociadas = this.idsPropostasSelecionadas;

    this.store.dispatch(salvarRenovacaoPropostaConsignacao({ propostaRenovacaoVo, file: this.file, afterSalvar: this.fechar }));
  }

  fechar = () => {
    this.proposta = undefined;
    this.margemDisponivel = undefined;
    this.idsPropostasSelecionadas = undefined;
    this.file = undefined;
    this.valorFormatado = undefined;

    this.form.resetForm();
    this.modal.close();
  }
}
