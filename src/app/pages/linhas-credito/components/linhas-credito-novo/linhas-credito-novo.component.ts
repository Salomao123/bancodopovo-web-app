import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { LinhaCredito } from '../../../../models/linha-credito';
import { TipoTaxaEnum } from '../../../../enums/tipo.taxa';
import { TipoPessoaEnum } from '../../../../enums/tipo.pessoa';
import { PessoaService } from '../../../../services/pessoa.service';
import { Pessoa } from '../../../../models/pessoa';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';
import { AppState } from '../../../../reducers/index';
import { BaseComponent } from '../../../base.components';
import { salvarLinhaCredito } from '../../actions/linhas-credito.action';
import { FormatadoresUtil } from '../../../../util/formatadores';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-linhas-credito-novo',
  templateUrl: './linhas-credito-novo.component.html',
  styleUrls: ['./linhas-credito-novo.component.scss']
})
export class LinhasCreditoNovoComponent extends BaseComponent implements OnInit, OnDestroy {

  pessoaCtrl = new FormControl();

  @ViewChild('modal', { static: true })
  modal: ModalComponent;

  @ViewChild('linhasCreditoNovoForm', { static: false })
  form: NgForm;

  pessoas: Pessoa[];
  pessoasFiltered: Observable<Pessoa[]>;
  documentoPessoa: string;
  linhaCredito: LinhaCredito = new LinhaCredito();
  pessoa: Pessoa = new Pessoa();
  tipoTaxa = TipoTaxaEnum;
  tipoPessoa = TipoPessoaEnum;

  constructor(private store: Store<AppState>,
    private pessoaService: PessoaService,) {
      super(store);
     }

  ngOnInit() {
  }

  private preencheValoresMonetariosFormatados() {
    if (this.linhaCredito.taxa) {
      this.linhaCredito.taxaFormatada = this.converterMoeda(this.linhaCredito.taxa);
    }
    if (this.linhaCredito.taxaMinima) {
      this.linhaCredito.taxaMinimaFormatada = this.converterMoeda(this.linhaCredito.taxaMinima);
    }
    if (this.linhaCredito.taxaMaxima) {
      this.linhaCredito.taxaMaximaFormatada = this.converterMoeda(this.linhaCredito.taxaMaxima);
    }
    if (this.linhaCredito.valorMinimo) {
      this.linhaCredito.valorMinimoFormatado = this.converterMoeda(this.linhaCredito.valorMinimo);
    }
    if (this.linhaCredito.valorMaximo) {
      this.linhaCredito.valorMaximoFormatado = this.converterMoeda(this.linhaCredito.valorMaximo);
    }
  }

  private parseValoresMonetariosEmprestimoFormatados() {
    if (this.linhaCredito.taxaFormatada) {
      this.linhaCredito.taxa = FormatadoresUtil.parseMoeda(this.linhaCredito.taxaFormatada);
    }
    if (this.linhaCredito.taxaMinimaFormatada) {
      this.linhaCredito.taxaMinima = FormatadoresUtil.parseMoeda(this.linhaCredito.taxaMinimaFormatada);
    }
    if (this.linhaCredito.taxaMaximaFormatada) {
      this.linhaCredito.taxaMaxima = FormatadoresUtil.parseMoeda(this.linhaCredito.taxaMaximaFormatada);
    }
    if (this.linhaCredito.valorMinimoFormatado) {
      this.linhaCredito.valorMinimo = FormatadoresUtil.parseMoeda(this.linhaCredito.valorMinimoFormatado);
    }
    if (this.linhaCredito.valorMaximoFormatado) {
      this.linhaCredito.valorMaximo = FormatadoresUtil.parseMoeda(this.linhaCredito.valorMaximoFormatado);
    }
  }

  converterMoeda(moeda: number) {
    var moedaFormatada = '';
    if (moeda != null) {
      moedaFormatada = FormatadoresUtil.formatarMoeda(moeda);
    }
    return moedaFormatada;
  }

  adicionar() {
    this.linhaCredito = new LinhaCredito();
    this.pessoa = new Pessoa();
    this.modal.open();
  }

  editar(linhaCredito: LinhaCredito) {
    this.linhaCredito = Object.assign({}, linhaCredito);
    this.preencheValoresMonetariosFormatados();
    //this.tratarDatas(this.linhaCredito);

    this.modal.open();
  }

  salvar() {

    if (this.form.valid) {
      this.linhaCredito.status = 1;
      console.log(this.linhaCredito);
      this.parseValoresMonetariosEmprestimoFormatados();

      if (this.linhaCredito.parcelasMinima > this.linhaCredito.parcelasMaxima) {
        this.addMessageError({ error: { message: 'O número de parcelas mínimas deve ser menor ou igual que o número de parcelas máximas.' } });
      } else if (this.linhaCredito.taxaMinima > this.linhaCredito.taxaMaxima) {
        this.addMessageError({ error: { message: 'O valor da Taxa Mínima deve ser menor ou igual que o valor da Taxa Máxima.' } });
      } else if (this.linhaCredito.valorMinimo > this.linhaCredito.valorMaximo) {
        this.addMessageError({ error: { message: 'O Valor Mínimo Permitido deve ser menor ou igual que o Valor Máximo Permitido.' } });
      } else if (this.linhaCredito.taxa <= 0) {
        this.addMessageError({ error: { message: 'A Taxa de Juros deve ser maior que zero.' } });
      } else if (this.linhaCredito.carenciaDias && this.linhaCredito.carenciaDias != null && this.linhaCredito.carenciaDias > 0
        && (!this.linhaCredito.indicadorCobrancaCarencia || this.linhaCredito.indicadorCobrancaCarencia == null)) {
        this.addMessageError({ error: { message: 'Caso o Prazo de Carência (em dias) seja preenchido, é necessário informar se será gerado ou não Boleto de Juros da Carência.' } });
      } else {
        this.store.dispatch(salvarLinhaCredito({ registro: Object.assign({}, this.linhaCredito), afterSave: this.fecharModal }));
      }

    } else {
      if (!this.linhaCredito.nome || this.linhaCredito.nome == null) {
        this.addMessageError({ error: { message: 'O Nome é obrigatório.' } });

      } else if (!this.linhaCredito.descricao || this.linhaCredito.descricao == null) {
        this.addMessageError({ error: { message: 'A Descrição é obrigatória.' } });

      } else if (!this.linhaCredito.tipoPessoa || this.linhaCredito.tipoPessoa == null) {
        this.addMessageError({ error: { message: 'o Tipo de Pessoa é obrigatório.' } });

      } else if (!this.linhaCredito.tipoTaxa || this.linhaCredito.tipoTaxa == null) {
        this.addMessageError({ error: { message: 'O Tipo de Taxa (Juros) é obrigatório.' } });

      } else if (!this.linhaCredito.taxaFormatada || this.linhaCredito.taxaFormatada == null) {
        this.addMessageError({ error: { message: 'A Taxa é obrigatória.' } });

      } else if (!this.linhaCredito.taxaMinimaFormatada || this.linhaCredito.taxaMinimaFormatada == null) {
        this.addMessageError({ error: { message: 'A Taxa Mínima é obrigatória.' } });

      } else if (!this.linhaCredito.taxaMaximaFormatada || this.linhaCredito.taxaMaximaFormatada == null) {
        this.addMessageError({ error: { message: 'A Taxa Máxima é obrigatória.' } });

      } else if (!this.linhaCredito.valorMinimoFormatado || this.linhaCredito.valorMinimoFormatado == null) {
        this.addMessageError({ error: { message: 'O Valor Mínimo Permitido é obrigatório.' } });

      } else if (!this.linhaCredito.valorMaximoFormatado || this.linhaCredito.valorMaximoFormatado == null) {
        this.addMessageError({ error: { message: 'O Valor Máximo Permitido é obrigatório.' } });

      } else if (!this.linhaCredito.parcelasMinima || this.linhaCredito.parcelasMinima == null) {
        this.addMessageError({ error: { message: 'A Qtd. Parcelas Mínimas é obrigatória.' } });

      } else if (!this.linhaCredito.parcelasMaxima || this.linhaCredito.parcelasMaxima == null) {
        this.addMessageError({ error: { message: 'A Qtd. Parcelas Máxima é obrigatória.' } });
      }
    }
  }

  fecharModal = () => {
    this.form.resetForm();
    this.linhaCredito = null;
    this.modal.close();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy 2');
    this.linhaCredito = new LinhaCredito();
  }

}
