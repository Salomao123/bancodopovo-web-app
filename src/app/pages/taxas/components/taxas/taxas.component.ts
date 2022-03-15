import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { Observable } from 'rxjs';
import { ServicoConsignacao } from '../../../../models/servico-consignacao';
import { selectServicosConsignacoesAtivos, selectParcelasServicoSelecionado } from '../../selectors/taxas.selectors';
import { recuperarServicosConsignacoesAtivosTaxas, salvarServicoConsignacaoTaxa, recuperarParcelasServicoConsignacaoTaxa } from '../../actions/taxax.actions';
import { selecionarParcelasTaxasParcelas, selecionarTodasParcelasTaxas, carregarJurosEncargosTaxasParcelas, atualizarParcelasTaxasParcelas } from '../../actions/taxas-parcelas.actions';
import { FormatadoresUtil } from '../../../../util/formatadores';
import { NgForm } from '@angular/forms';
import { ServicoConsignacaoParcela } from '../../../../models/servico-consignacao-parcela';
import { Table } from 'primeng/table';
import { ObjetoSelecionavel } from '../../../../vo/objeto-selecionavel.vo';
import { selectParcelasTaxasParcelas } from '../../selectors/taxas-parcelas.selectors';
import { selecionarParcelaTaxaParcelas } from '../../actions/taxas-parcelas.actions';

declare var $: any;

@Component({
  selector: 'app-taxas',
  templateUrl: './taxas.component.html',
  styleUrls: ['./taxas.component.scss']
})
export class TaxasComponent extends BaseComponent implements OnInit {

  @ViewChild('parcelasTable', { static: false })
  table: Table;

  @ViewChild('manterTaxasForm', { static: false })
  form: NgForm;

  servicos$: Observable<ServicoConsignacao[]>;
  parcelas$: Observable<ObjetoSelecionavel<ServicoConsignacaoParcela>[]>;
  servicoSelecionado: ServicoConsignacao;

  jurosFormatado: string;
  encargoFormatado: string;

  selecionarPagina: boolean;
  selecionarTodos: boolean;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.selecionarPagina = false;
    this.selecionarTodos = false;

    this.servicos$ = this.store.pipe(select(selectServicosConsignacoesAtivos));
    this.parcelas$ = this.store.pipe(select(selectParcelasTaxasParcelas));
    this.store.dispatch(recuperarServicosConsignacoesAtivosTaxas());
  }

  changeServico() {
    this.jurosFormatado = undefined;
    this.encargoFormatado = undefined;
  }

  pesquisar() {
    this.jurosFormatado = FormatadoresUtil.formatarMoeda((this.servicoSelecionado.juros) ? this.servicoSelecionado.juros : 0.0);
    this.encargoFormatado = FormatadoresUtil.formatarMoeda((this.servicoSelecionado.encargos) ? this.servicoSelecionado.encargos : 0.0);

    if (!this.jurosFormatado) {
      this.jurosFormatado = '0,00';
    }

    if (!this.encargoFormatado) {
      this.encargoFormatado = '0,00';
    }

    this.store.dispatch(recuperarParcelasServicoConsignacaoTaxa(
      { idServicoConsignacao: this.servicoSelecionado.id, afterConsulta: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.table);
  }

  changeSelectParcela(id: number, isChecked: boolean) {
    this.store.dispatch(selecionarParcelaTaxaParcelas({ idParcela: id, selecionado: isChecked }));
  }

  changeSelecionarPagina(isChecked: boolean) {
    if (!this.selecionarTodos) {
      const idsParcelas: number[] = [];

      $('.tb-select').each(function(index) {
        idsParcelas.push($(this).attr('cod') as number);
      });

      this.store.dispatch(selecionarParcelasTaxasParcelas({ idsParcelas, selecionado: isChecked }));
    }
  }

  changeSelecionarTodos(isChecked: boolean) {
    this.store.dispatch(selecionarTodasParcelasTaxas({ selecionado: isChecked }));
  }

  cancelar(form: NgForm) {
    this.jurosFormatado = undefined;
    this.encargoFormatado = undefined;

    form.resetForm();
  }

  preencherJurosEncargos(form: NgForm) {
    if (form.valid) {
      const juros = FormatadoresUtil.parseMoeda(this.jurosFormatado);
      const encargos = FormatadoresUtil.parseMoeda(this.encargoFormatado);

      this.store.dispatch(carregarJurosEncargosTaxasParcelas({ juros, encargos }));
    }
  }

  salvar() {
    this.store.dispatch(atualizarParcelasTaxasParcelas({ afterSalvar: this.limparDados }));
  }

  limparDados = () => {
    this.cancelar(this.form);
  }

}
