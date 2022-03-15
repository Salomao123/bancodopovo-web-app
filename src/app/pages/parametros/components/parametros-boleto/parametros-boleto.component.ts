import { Component, OnInit, ViewChild } from '@angular/core';
import { ParametroBoleto } from '../../../../models/parametro.boleto';
import { Observable } from 'rxjs';
import { OpcoesParametroBoletoVo } from '../../../../vo/opcoes-parametro-boleto.vo';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { BaseComponent } from '../../../base.components';
import { selectOpcoesBoleto, selectParametrosBoleto } from '../../selectors/parametro.selectors';
import { recuperarParametrosBoleto, salvarParametroBoleto } from '../../actions/parametros.actions';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { FormatadoresUtil } from '../../../../util/formatadores';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-parametros-boleto',
  templateUrl: './parametros-boleto.component.html',
  styleUrls: ['./parametros-boleto.component.scss']
})
export class ParametrosBoletoComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('parametroBoletoForm', { static: false })
  form: NgForm;

  parametroBoleto: ParametroBoleto;
  opcoes$: Observable<OpcoesParametroBoletoVo>;

  valorJurosFormatado: string;
  valorMultaFormatado: string;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.opcoes$ = this.store.pipe(select(selectOpcoesBoleto));
  }

  carregarValoresFormatados() {
    this.valorJurosFormatado = FormatadoresUtil.formatarMoeda(this.parametroBoleto.valorJuros);
    this.valorMultaFormatado = FormatadoresUtil.formatarMoeda(this.parametroBoleto.valorMulta);

    if (!this.parametroBoleto.codProtesto || this.parametroBoleto.codProtesto == null) {
      this.parametroBoleto.codProtesto = undefined;
    }
    if (!this.parametroBoleto.codJuros || this.parametroBoleto.codJuros == null) {
      this.parametroBoleto.codJuros = undefined;
    }
    if (!this.parametroBoleto.identificacaoDistribuicao || this.parametroBoleto.identificacaoDistribuicao == null) {
      this.parametroBoleto.identificacaoDistribuicao = undefined;
    }
    if (!this.parametroBoleto.especieTitulo || this.parametroBoleto.especieTitulo == null) {
      this.parametroBoleto.especieTitulo = undefined;
    }
    if (!this.parametroBoleto.emissaoBloqueto || this.parametroBoleto.emissaoBloqueto == null) {
      this.parametroBoleto.emissaoBloqueto = undefined;
    }
    if (!this.parametroBoleto.tipoDocCobranca || this.parametroBoleto.tipoDocCobranca == null) {
      this.parametroBoleto.tipoDocCobranca = undefined;
    }
    if (!this.parametroBoleto.formaCadastro || this.parametroBoleto.formaCadastro == null) {
      this.parametroBoleto.formaCadastro = undefined;
    }
    if (!this.parametroBoleto.codigoCarteira || this.parametroBoleto.codigoCarteira == null) {
      this.parametroBoleto.codigoCarteira = undefined;
    }
    if (!this.parametroBoleto.codBaixa || this.parametroBoleto.codBaixa == null) {
      this.parametroBoleto.codBaixa = undefined;
    }
    if (!this.parametroBoleto.identificacaoTituloAceito || this.parametroBoleto.identificacaoTituloAceito == null) {
      this.parametroBoleto.identificacaoTituloAceito = undefined;
    }
    if (!this.parametroBoleto.codDesconto || this.parametroBoleto.codDesconto == null) {
      this.parametroBoleto.codDesconto = undefined;
    }
    if (!this.parametroBoleto.codMulta || this.parametroBoleto.codMulta == null) {
      this.parametroBoleto.codMulta = undefined;
    }
    if (!this.parametroBoleto.tipoDocumento || this.parametroBoleto.tipoDocumento == null) {
      this.parametroBoleto.tipoDocumento = undefined;
    }
    if (!this.parametroBoleto.tipoDocumento || this.parametroBoleto.tipoDocumento == null) {
      this.parametroBoleto.tipoDocumento = undefined;
    }
  }

  carregar() {
    this.store.pipe(select(selectParametrosBoleto)).subscribe(
      res => {
        if (res) {
          this.parametroBoleto = Object.assign({}, res);
          this.carregarValoresFormatados();
        }
      }
    );

    this.store.dispatch(recuperarParametrosBoleto({ after: this.aposCarregar }));
  }

  aposCarregar = () => {
    this.modal.open();
  }

  fechar = () => {
    this.form.resetForm();
    this.modal.close();
  }

  salvar() {
    if (this.form.valid) {
      if (this.valorJurosFormatado) {
        this.parametroBoleto.valorJuros = FormatadoresUtil.parseMoeda(this.valorJurosFormatado);
      }
      if (this.valorMultaFormatado) {
        this.parametroBoleto.valorMulta = FormatadoresUtil.parseMoeda(this.valorMultaFormatado);
      }

      this.store.dispatch(salvarParametroBoleto({ parametroBoleto: Object.assign({}, this.parametroBoleto), afterSave: this.fechar }));
    }
  }

}
