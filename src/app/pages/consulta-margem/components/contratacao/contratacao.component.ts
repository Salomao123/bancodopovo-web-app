import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoConsignacao } from 'src/app/models/servico-consignacao';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectServicosConsignacao } from '../../selectors/consulta-margem.selectors';
import { Pessoa } from '../../../../models/pessoa';
import { EmpregadoConsignante } from '../../../../models/empregado-consignante';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { NgForm } from '@angular/forms';
import { recuperarServicosConsignacaoAtivosConsultaMargem, salvarPropostaConsultaMargem } from '../../actions/consulta-margem.actions';
import { Proposta } from '../../../../models/proposta';
import { FormatadoresUtil } from '../../../../util/formatadores';

@Component({
  selector: 'app-contratacao',
  templateUrl: './contratacao.component.html',
  styleUrls: ['./contratacao.component.scss']
})
export class ContratacaoComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('contratacaoForm', { static: false })
  form: NgForm;

  servicos$: Observable<ServicoConsignacao[]>;

  proposta: Proposta;

  pessoa: Pessoa;
  empregado: EmpregadoConsignante;

  valorParcelaFormatado: string;
  servicoSelecionado: number;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.limpar();
    this.servicos$ = this.store.pipe(select(selectServicosConsignacao));
  }

  limpar() {
    this.proposta = new Proposta();
    this.servicoSelecionado = undefined;
  }

  carregar(pessoa: Pessoa, empregado: EmpregadoConsignante) {
    this.pessoa = pessoa;
    this.empregado = empregado;

    this.store.dispatch(recuperarServicosConsignacaoAtivosConsultaMargem());

    this.modal.open();
  }

  salvar() {
    if (this.form.valid) {
      this.proposta.empregadoConsignante = Object.assign({}, this.empregado);
      this.proposta.servicoConsignacao = new ServicoConsignacao();
      this.proposta.servicoConsignacao.id = this.servicoSelecionado;

      this.proposta.valorParcela = FormatadoresUtil.parseMoeda(this.valorParcelaFormatado);

      if (this.validarValorParcela()) {
        this.store.dispatch(salvarPropostaConsultaMargem({ proposta: this.proposta, afterSave: this.fechar }));
      }
    }
  }

  validarValorParcela() {
    const margem = (this.empregado.salario / 100) * this.empregado.margem;
    if (this.proposta.valorParcela > this.empregado.valorMargem) {
      super.addMessageError({ error: { message: 'O valor da parcela não pode ser superior a margem.' } });
      return false;
    }

    return true;
  }

  fechar = () => {
    this.limpar();
    this.form.resetForm();
    this.modal.close();
  }

}
