import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/usuario';
import { ModalComponent } from '../../../common/components/modal/modal.component';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { selectUsuarioLogado } from 'src/app/public/login/selectors/login.selectors';
import { selectAllLinhasCredito, selectLinhaCreditoModal, selectLinhaCreditoPageShow } from 'src/app/pages/linhas-credito/selectors/linhas-credito.selectors';
import { LinhaCredito } from 'src/app/models/linha-credito';
import { FormatadoresUtil } from '../../../util/formatadores';
import { BaseComponent } from 'src/app/pages/base.components';
import { pesquisarLinhaCredito } from 'src/app/pages/linhas-credito/actions/linhas-credito.action';
import { LinhasCreditoService } from 'src/app/services/linhas-credito.service';





declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  @ViewChild('modalSimular', { static: true })
  modal: ModalComponent;

  usuarioLogado$: Observable<Usuario>;

  linhasCredito$: Observable<Array<LinhaCredito>>
  linhasCredito: Array<any>

  valorSolicitadoErro = ""
  parcelasErro = ""
  taxaAnualErro = ""

  linhaSelecionada: LinhaCredito

  calculo: any
  juros: number
  prestacaoPeriodica: number

  calculado: Boolean
  tipo:any


  constructor(private store: Store<AppState>,private linhasCreditoService: LinhasCreditoService) {
    super(store)
   }

  ngOnInit() {

  }

  flinhaSelecionada(){

  }

  abrirModalSimulacao() {

    this.usuarioLogado$ = this.store.pipe(select(selectUsuarioLogado))

    this.store.pipe(select(selectUsuarioLogado)).subscribe((usuario) => {
      this.tipo = usuario.pessoa.tipo;
    });

    this.linhasCreditoService.recuperarLinhasAtivas(this.tipo).subscribe(
      l => this.linhasCredito = l/*,
      error => this.addMessageError(error)*/);
    
    this.modal.open();
  }

  limparDadosSimulacao() {
    this.calculado = false;

  }

  calcularSimulacao(){
    this.juros = this.taxaAnual/100

    this.prestacaoPeriodica = (this.valor * this.juros)/(1-(1/((1+this.juros)**(this.parcelas)))) 

  }


  simularEmprestimo() {
    if(this.condicaoParaSimular()){
      this.calcularSimulacao();
      this.calculado = true;

      this.calculo = {    
        prestacao:FormatadoresUtil.formatarMoeda(this.prestacaoPeriodica),
        financiado:this.valorFormatado,
        juros:this.taxaAnual,
        parcelas:this.parcelas
      }
    }else{
      this.addMessageError({ error: { message: 
        'Verifique se todos os campos foram escolhidos conforme o permitido pela linha de crédito selecionada.' } });
    }    
  }


  valor: number;
  valorFormatado: string;

  parcelas: number;

  taxaAnualFormatada: string;
  taxaAnual: number;


  salvarValorSolicitado(value){
    this.valorFormatado = value
    this.valor = FormatadoresUtil.parseMoeda(this.valorFormatado);
    this.valorFormatado = FormatadoresUtil.formatarMoeda(this.valor);

    this.valorSolicitadoErro = ""

    //validando input de acordo com os valores permitidos da linha selecionada

    if(this.valor>this.linhaSelecionada.valorMaximo){
      this.valor = this.linhaSelecionada.valorMaximo;
      this.valorFormatado = FormatadoresUtil.formatarMoeda(this.valor);

      this.valorSolicitadoErro = "O valor solicitado deve ser menor que o valor máximo da linha de crédito"
    }
    if(this.valor<this.linhaSelecionada.valorMinimo){
      this.valor = this.linhaSelecionada.valorMinimo
      this.valorFormatado = FormatadoresUtil.formatarMoeda(this.valor);

      this.valorSolicitadoErro = "O valor solicitado deve ser maior que o valor mínimo da linha de crédito"
    }


  }
  salvarParcelas(value){
    this.parcelas = FormatadoresUtil.parseMoeda(value);;
    this.parcelasErro = ""

    //validando input de acordo com os valores permitidos da linha selecionada

    if(this.parcelas>this.linhaSelecionada.parcelasMaxima){
      this.parcelas = this.linhaSelecionada.parcelasMaxima;
      this.parcelasErro = "O nº de parcelas deve ser menor que o n.º de parcelas máximo da linha de crédito"
    }
    if(this.parcelas<this.linhaSelecionada.parcelasMinima){
      this.parcelas = this.linhaSelecionada.parcelasMinima
      this.parcelasErro = "O nº de parcelas deve ser maior que nº de parcelas mínimo da linha de crédito"
    }

  }
  salvarTaxaAnual(value){
    this.taxaAnualFormatada = value;
    this.taxaAnual = FormatadoresUtil.parseMoeda(this.taxaAnualFormatada);
    this.taxaAnualFormatada = FormatadoresUtil.formatarMoeda(this.taxaAnual);

    //validando input de acordo com os valores permitidos da linha selecionada

    this.taxaAnualErro = ""

    if(this.taxaAnual>this.linhaSelecionada.taxaMaxima){
      this.taxaAnual = this.linhaSelecionada.taxaMaxima;
      this.taxaAnualFormatada = FormatadoresUtil.formatarMoeda(this.linhaSelecionada.taxaMaxima);

      this.taxaAnualErro = "A taxa anual deve ser menor que a taxa máxima da linha de crédito"
    }
    if(this.taxaAnual<this.linhaSelecionada.taxaMinima){
      this.taxaAnual = this.linhaSelecionada.taxaMinima
      this.taxaAnualFormatada = FormatadoresUtil.formatarMoeda(this.linhaSelecionada.taxaMinima);

      this.taxaAnualErro = "A taxa anual deve ser maior que a taxa mínima da linha de crédito"
    }


  }

  condicaoParaSimular(){
    if(this.taxaAnual && this.parcelas && this.valor && this.linhaSelecionada) {

      if((this.taxaAnual>=this.linhaSelecionada.taxaMinima) &&
         (this.taxaAnual<=this.linhaSelecionada.taxaMaxima) &&

         (this.parcelas>=this.linhaSelecionada.parcelasMinima) &&
         (this.parcelas<=this.linhaSelecionada.parcelasMaxima) &&

         (this.valor<=this.linhaSelecionada.valorMaximo) &&
         (this.valor>=this.linhaSelecionada.valorMinimo)

        ) {
          return true
        }

    } return false

  }





}
