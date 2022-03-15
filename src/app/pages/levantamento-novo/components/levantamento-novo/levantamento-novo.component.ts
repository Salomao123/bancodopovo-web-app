import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Levantamento } from '../../../../models/levantamento';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from '../../../../models/pessoa';
import { Emprestimo } from '../../../../models/emprestimo';
import { SimulacaoEmprestimoVo } from '../../../../vo/simulacao.emprestimo.vo';
import { PessoaService } from '../../../../services/pessoa.service';
import { LevantamentosService } from '../../../../services/levantamentos.service';
import { EmprestimosService } from '../../../../services/emprestimos.service';
import { LinhasCreditoService } from '../../../../services/linhas-credito.service';
import { Store, select } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { countLevantamento, pesquisarLevantamento, atualiarStatusLevantamento, countLevantamentoSucesso } from '../../actions/levantamento-novo.action';
import { Observable, of } from 'rxjs';
import swal from 'sweetalert';
import { selectLevantamentoCount, selectLevantamentosPage, selectLevantamentosPageShow } from '../../selectors/levantamento-novo.selectors';
import { PaginationLoadLazy, PageQuery } from '../../../../util/pagination';
import { tap } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { BaseComponent } from '../../../base.components';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { StatusLevantamentoEnum } from '../../../../enums/status.levantamento';
import { ExperienciaProfissionalEnum } from '../../../../enums/experiencia.profissional';
import { EstadoCivilEnum } from '../../../../enums/estado.civil';
import { TipoPessoaEnum } from '../../../../enums/tipo.pessoa';
import { TipoGastoEnum } from '../../../../enums/tipo.gasto';
import { TipoNegocioEnum } from '../../../../enums/tipo.negocio';
import { TipoRendaEnum } from '../../../../enums/tipo.renda';
import { ComunicadoClienteEnum } from '../../../../enums/comunicado.cliente';
import { PontoEnum } from '../../../../enums/ponto';
import { LocalEnum } from '../../../../enums/local';
import { AtividadeEnum } from '../../../../enums/atividade';
import { ImpostoEnum } from '../../../../enums/imposto';
import { ConceitoVendaEnum } from '../../../../enums/conceito.venda';
import { LevantamentoRendaFamiliar } from '../../../../models/levantamento-renda-familiar';
import { LevantamentoGastoFamiliar } from '../../../../models/levantamento-gasto-familiar';
import { LevantamentoExperienciaProfissional } from '../../../../models/levantamento-experiencia-profissional';
import { LevantamentoCurso } from '../../../../models/levantamento-curso';
import { LevantamentoReceita } from '../../../../models/levantamento-receita';
import { LevantamentoCusto } from '../../../../models/levantamento-custo';
import { LevantamentoCliente } from '../../../../models/levantamento-cliente';
import { LevantamentoFornecedor } from '../../../../models/levantamento-fornecedor';
import { LevantamentoHistoricoVendas } from '../../../../models/levantamento-historico-vendas';
import { Usuario } from '../../../../models/usuario';
import { LinhaCredito } from '../../../../models/linha-credito';
import { FormatadoresUtil } from '../../../../util/formatadores';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { selectUsuarioLogado } from '../../../../public/login/selectors/login.selectors';

import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-levantamento-novo',
  templateUrl: './levantamento-novo.component.html',
  styleUrls: ['./levantamento-novo.component.scss']
})
export class LevantamentoNovoComponent extends BaseComponent implements OnInit, OnDestroy {

  pessoaCtrl = new FormControl();
  avalistaCtrl = new FormControl();

  @ViewChild('modalEmprestimo', {static: false})
  modal: ModalComponent;

  @ViewChild('btnImprimir', {static: false}) 
  btnImprimir: ElementRef;

  @ViewChild('levantamentoNovoForm', { static: false })
  form: NgForm;

  usuarioLogado$: Observable<Usuario>;
  usuario: Usuario;

  tipoCarregamento: string;

  status = StatusLevantamentoEnum;
  tipo: TipoPessoaEnum;
  tipoAvalista: TipoPessoaEnum;
  tipoPessoa = TipoPessoaEnum;
  tipoGasto = TipoGastoEnum;

  pessoas: Pessoa[];
  pessoasFiltered: Observable<Pessoa[]>;
  avalistasFiltered: Observable<Pessoa[]>;
  pessoa: Pessoa = new Pessoa();
  avalista: Pessoa = new Pessoa();
  levantamento: Levantamento = new Levantamento();
  emprestimo: Emprestimo = new Emprestimo();
  idLevantamento: number;
  documentoPessoa: string;
  documentoAvalista: string;
  pt: Object = languageCalendar

  levantamentoRendaFamiliar: LevantamentoRendaFamiliar = new LevantamentoRendaFamiliar();
  rendaFamiliar: Array<LevantamentoRendaFamiliar>;

  levantamentoGastoFamiliar: LevantamentoGastoFamiliar = new LevantamentoGastoFamiliar();
  gastoFamiliar: Array<LevantamentoGastoFamiliar>;

  levantamentoExperienciaProfissional: LevantamentoExperienciaProfissional = new LevantamentoExperienciaProfissional();
  experienciaProfissional: Array<LevantamentoExperienciaProfissional>;

  levantamentoCurso: LevantamentoCurso = new LevantamentoCurso();
  curso: Array<LevantamentoCurso>;

  levantamentoReceita: LevantamentoReceita = new LevantamentoReceita();
  receita: Array<LevantamentoReceita>;

  levantamentoCusto: LevantamentoCusto = new LevantamentoCusto();
  custo: Array<LevantamentoCusto>;

  levantamentoCliente: LevantamentoCliente = new LevantamentoCliente();
  cliente: Array<LevantamentoCliente>;

  levantamentoFornecedor: LevantamentoFornecedor = new LevantamentoFornecedor();
  fornecedor: Array<LevantamentoFornecedor>;

  levantamentoHistoricoVendas: LevantamentoHistoricoVendas = new LevantamentoHistoricoVendas();
  historicoVendas: Array<LevantamentoHistoricoVendas>;

  linhasCredito: Array<LinhaCredito>;

  constructor(private store: Store<AppState>, 
    private pessoaService : PessoaService,
    private levantamentosService: LevantamentosService, 
    private emprestimosService: EmprestimosService, 
    private route: ActivatedRoute,
    private router: Router,
    private linhasCreditoService: LinhasCreditoService) {
    super(store);
  }

  ngOnInit() {
    this.levantamento.totalGastosFormatado = "R$ 0,00";
    this.levantamento.subtotalCustosFormatado = "R$ 0,00";
    this.levantamento.reservaEmergenciaFormatada = "R$ 0,00";
    this.levantamento.totalCustosFormatado = "R$ 0,00";
    this.usuarioLogado$ = this.store.pipe(select(selectUsuarioLogado));
    this.usuarioLogado$.subscribe((u: Usuario) => {
      this.usuario = u;
    });

    this.route.queryParams.subscribe(params => {
      this.idLevantamento = params['idLevantamento'];
      this.tipoCarregamento = params['tipo'];

      if (this.idLevantamento) {
          this.levantamentosService.recuperarPorId(this.idLevantamento).subscribe(
            l => this.preencherDadosLevantamento(l),
            error => this.addMessageError(error));
      } else {
        this.pessoaService.recuperarPessoas().subscribe(
          ps => this.carregarPessoas(ps),
          error => this.addMessageError(error));
      }
      this.undefinedValores();
    });
  }

  private undefinedValores() {
    if (!this.levantamento.comunicadoClienteParecerComite || this.levantamento.comunicadoClienteParecerComite == null) {
      this.levantamento.comunicadoClienteParecerComite = undefined;
    }
    if (!this.levantamento.imposto || this.levantamento.imposto == null) {
      this.levantamento.imposto = undefined;
    }
    if (!this.levantamento.tipoRenda || this.levantamento.tipoRenda == null) {
      this.levantamento.tipoRenda = undefined;
    }

    if (!this.levantamento.tipoNegocio || this.levantamento.tipoNegocio == null) {
      this.levantamento.tipoNegocio = undefined;
    }
    if (!this.levantamento.ponto || this.levantamento.ponto == null) {
      this.levantamento.ponto = undefined;
    }
    if (!this.levantamento.local || this.levantamento.local == null) {
      this.levantamento.local = undefined;
    }
    if (!this.levantamento.atividade || this.levantamento.atividade == null) {
      this.levantamento.atividade = undefined;
    }
    if (!this.levantamento.possuiDivida || this.levantamento.possuiDivida == null) {
      this.levantamento.possuiDivida = undefined;
    }
    if (!this.levantamentoHistoricoVendas.conceitoVenda || this.levantamentoHistoricoVendas.conceitoVenda == null) {
      this.levantamentoHistoricoVendas.conceitoVenda = undefined;
    }
    if (!this.levantamento.grau || this.levantamento.grau == null) {
      this.levantamento.grau = undefined;
    }
    if (!this.levantamentoGastoFamiliar.tipo || this.levantamentoGastoFamiliar.tipo == null) {
      this.levantamentoGastoFamiliar.tipo = undefined;
    }

    if (!this.levantamento.tipoControleFormal || this.levantamento.tipoControleFormal == null) {
      this.levantamento.tipoControleFormal = undefined;
    }
    if (!this.levantamento.tipoControleLivroCaixa || this.levantamento.tipoControleLivroCaixa == null) {
      this.levantamento.tipoControleLivroCaixa = undefined;
    }
    if (!this.levantamento.tipoControleEstoque || this.levantamento.tipoControleEstoque == null) {
      this.levantamento.tipoControleEstoque = undefined;
    }
    if (!this.levantamento.tipoControleReceber || this.levantamento.tipoControleReceber == null) {
      this.levantamento.tipoControleReceber = undefined;
    }
    if (!this.levantamento.tipoControleReceitas || this.levantamento.tipoControleReceitas == null) {
      this.levantamento.tipoControleReceitas = undefined;
    }
    if (!this.levantamento.tipoControlePagar || this.levantamento.tipoControlePagar == null) {
      this.levantamento.tipoControlePagar = undefined;
    }
    if (!this.levantamento.tipoControleCaderno || this.levantamento.tipoControleCaderno == null) {
      this.levantamento.tipoControleCaderno = undefined;
    }
    if (!this.levantamento.linhaCredito || this.levantamento.linhaCredito == null) {
      this.levantamento.linhaCredito = undefined;
    }
  }

  carregarOutrosGastos() {
    this.levantamento.totalGastosFormatado = "R$ 0,00";
    var totalGastos = 0;
    if (this.levantamento.gastoTransporteSemVendasFormatado 
      && this.levantamento.gastoTransporteSemVendasFormatado != null) {
        totalGastos = totalGastos + FormatadoresUtil.parseMoeda(this.levantamento.gastoTransporteSemVendasFormatado);
    }
    if (this.levantamento.comissaoVendasFormatada 
      && this.levantamento.comissaoVendasFormatada != null) {
        totalGastos = totalGastos + FormatadoresUtil.parseMoeda(this.levantamento.comissaoVendasFormatada);
    }
    if (this.levantamento.outrosGastosFormatado 
      && this.levantamento.outrosGastosFormatado != null) {
        totalGastos = totalGastos + FormatadoresUtil.parseMoeda(this.levantamento.outrosGastosFormatado);
    }

    if (totalGastos != null && totalGastos > 0) {
      this.levantamento.totalGastosFormatado = this.converterMoeda(totalGastos);
    }
  }

  carregarOutrosCustos() {
    this.levantamento.totalCustosFormatado = "R$ 0,00";
    var subtotalCustos = 0;
    var reservasEmergencias = 0;
    var totalCustos = 0;

    if (this.levantamento.aluguelTaxaCondominioFormatado 
      && this.levantamento.aluguelTaxaCondominioFormatado != null) {
        subtotalCustos = subtotalCustos + FormatadoresUtil.parseMoeda(this.levantamento.aluguelTaxaCondominioFormatado);
    }
    if (this.levantamento.maoObraTrabalhistaFormatada 
      && this.levantamento.maoObraTrabalhistaFormatada != null) {
        subtotalCustos = subtotalCustos + FormatadoresUtil.parseMoeda(this.levantamento.maoObraTrabalhistaFormatada);
    }
    if (this.levantamento.maoObraTrabalhistaEncargosFormatada 
      && this.levantamento.maoObraTrabalhistaEncargosFormatada != null) {
        subtotalCustos = subtotalCustos + FormatadoresUtil.parseMoeda(this.levantamento.maoObraTrabalhistaEncargosFormatada);
    }
    if (this.levantamento.maoObraSemCustoTrabalhistaFormatada 
      && this.levantamento.maoObraSemCustoTrabalhistaFormatada != null) {
        subtotalCustos = subtotalCustos + FormatadoresUtil.parseMoeda(this.levantamento.maoObraSemCustoTrabalhistaFormatada);
    }
    if (this.levantamento.aguaLuzTelefoneFormatado 
      && this.levantamento.aguaLuzTelefoneFormatado != null) {
        subtotalCustos = subtotalCustos + FormatadoresUtil.parseMoeda(this.levantamento.aguaLuzTelefoneFormatado);
    }
    if (this.levantamento.veiculoTransporteFormatado 
      && this.levantamento.veiculoTransporteFormatado != null) {
        subtotalCustos = subtotalCustos + FormatadoresUtil.parseMoeda(this.levantamento.veiculoTransporteFormatado);
    }
    if (this.levantamento.contadorFormatado 
      && this.levantamento.contadorFormatado != null) {
        subtotalCustos = subtotalCustos + FormatadoresUtil.parseMoeda(this.levantamento.contadorFormatado);
    }
    if (this.levantamento.prolaboreFormatado 
      && this.levantamento.prolaboreFormatado != null) {
        subtotalCustos = subtotalCustos + FormatadoresUtil.parseMoeda(this.levantamento.prolaboreFormatado);
    }
    if (this.levantamento.manutencaoFormatado 
      && this.levantamento.manutencaoFormatado != null) {
        subtotalCustos = subtotalCustos + FormatadoresUtil.parseMoeda(this.levantamento.manutencaoFormatado);
    }

    if (subtotalCustos != null && subtotalCustos > 0) {
      this.levantamento.subtotalCustosFormatado = this.converterMoeda(subtotalCustos);
      reservasEmergencias = subtotalCustos * 0.05;
      this.levantamento.reservaEmergenciaFormatada = this.converterMoeda(reservasEmergencias);
      totalCustos = subtotalCustos + reservasEmergencias;
      this.levantamento.totalCustosFormatado = this.converterMoeda(totalCustos);
    }    
  }

  verificarTaxaJuros() {
    if (this.levantamento.taxaJurosParecerAgenteFormatado 
      && this.levantamento.taxaJurosParecerAgenteFormatado != null) {
      let taxaJurosParecerAgente = FormatadoresUtil.parseMoeda(this.levantamento.taxaJurosParecerAgenteFormatado);
      this.levantamento.taxaJurosParecerAgente = taxaJurosParecerAgente;
      if (taxaJurosParecerAgente < this.levantamento.linhaCredito.taxaMinima) {
        this.addMessageError({ error: { message: 'A Taxa de Juros não pode ser menor que a Taxa de Juros Mínima da Linha de Crédito.' } });
        this.levantamento.creditoSugeridoParecerAgenteFormatado = undefined;
        this.levantamento.creditoSugeridoParecerAgente = undefined;
        this.levantamento.qtdParcelasParecerAgente = undefined;
        this.levantamento.taxaJurosParecerAgente = undefined;
        this.levantamento.taxaJurosParecerAgenteFormatado = undefined;
      } else if (taxaJurosParecerAgente > this.levantamento.linhaCredito.taxaMaxima) {
        this.addMessageError({ error: { message: 'A Taxa de Juros não pode ser maior que a Taxa de Juros Máxima da Linha de Crédito.' } });
        this.levantamento.creditoSugeridoParecerAgenteFormatado = undefined;
        this.levantamento.creditoSugeridoParecerAgente = undefined;
        this.levantamento.qtdParcelasParecerAgente = undefined;
        this.levantamento.taxaJurosParecerAgente = undefined;
        this.levantamento.taxaJurosParecerAgenteFormatado = undefined;
      } else {

      }
    }
  }

  verificarCreditoSugerido() {
    if (this.levantamento.creditoSugeridoParecerAgenteFormatado 
      && this.levantamento.creditoSugeridoParecerAgenteFormatado != null) {
      let creditoSugeridoParecerAgente = FormatadoresUtil.parseMoeda(this.levantamento.creditoSugeridoParecerAgenteFormatado);
      this.levantamento.creditoSugeridoParecerAgente = creditoSugeridoParecerAgente;
      if (creditoSugeridoParecerAgente < this.levantamento.linhaCredito.valorMinimo) {
        this.addMessageError({ error: { message: 'O Crédito Sugerido não pode ser menor que o Valor Mínimo da Linha de Crédito.' } });
        this.levantamento.creditoSugeridoParecerAgenteFormatado = undefined;
        this.levantamento.creditoSugeridoParecerAgente = undefined;
        this.levantamento.qtdParcelasParecerAgente = undefined;
      } else if (creditoSugeridoParecerAgente > this.levantamento.linhaCredito.valorMaximo) {
        this.addMessageError({ error: { message: 'O Crédito Sugerido não pode ser maior que o Valor Máximo da Linha de Crédito.' } });
        this.levantamento.creditoSugeridoParecerAgenteFormatado = undefined;
        this.levantamento.creditoSugeridoParecerAgente = undefined;
        this.levantamento.qtdParcelasParecerAgente = undefined;
      } else {
        this.levantamento.creditoAprovadoParecerComite = this.levantamento.creditoSugeridoParecerAgente;
        this.levantamento.creditoAprovadoParecerComiteFormatado = this.levantamento.creditoSugeridoParecerAgenteFormatado;
      }
    }
  }

  verificarQtdParcelas() {
    if (this.levantamento.qtdParcelasParecerAgente 
      && this.levantamento.qtdParcelasParecerAgente != null) {
        if (this.levantamento.qtdParcelasParecerAgente < this.levantamento.linhaCredito.parcelasMinima) {
          this.addMessageError({ error: { message: 'A Qtd. de Parcelas não pode ser menor que a Quantidade de Parcelas Mínimas da Linha de Crédito.' } });
          this.levantamento.qtdParcelasParecerAgente = undefined;
        } else if (this.levantamento.qtdParcelasParecerAgente > this.levantamento.linhaCredito.parcelasMaxima) {
          this.addMessageError({ error: { message: 'A Qtd. de Parcelas não pode ser maior que a Quantidade de Parcelas Máximas da Linha de Crédito.' } });
          this.levantamento.qtdParcelasParecerAgente = undefined;
        } else {
          if (this.levantamento.creditoSugeridoParecerAgente && this.levantamento.qtdParcelasParecerAgente && this.levantamento.taxaJurosParecerAgenteFormatado) {
            
            let taxaJuros = FormatadoresUtil.parseMoeda(this.levantamento.taxaJurosParecerAgenteFormatado);
            let simulacao = new SimulacaoEmprestimoVo();
            simulacao.valorEmprestimo = this.levantamento.creditoSugeridoParecerAgente;
            simulacao.taxaJuros = taxaJuros;
            simulacao.numeroParcelas = this.levantamento.qtdParcelasParecerAgente;
            this.levantamentosService.recuperarParcela(simulacao).subscribe(
              s => this.preencherValorParcela(s),
              error => this.addMessageError(error));
          }
        }
    }
  }

  private preencherValorParcela(s: SimulacaoEmprestimoVo) {
    
    this.levantamento.valorParcelaParecerAgente = s.valorParcela;
    this.levantamento.valorParcelaParecerAgenteFormatado = this.converterMoeda(this.levantamento.valorParcelaParecerAgente);

    this.levantamento.valorFinalParcelaParecerAgente = s.valorParcela;
    this.levantamento.valorFinalParcelaParecerAgenteFormatado = this.converterMoeda(this.levantamento.valorFinalParcelaParecerAgente);

    if (this.levantamento.taxaBoletoParecerAgenteFormatado) {
      this.levantamento.taxaBoletoParecerAgente = FormatadoresUtil.parseMoeda(this.levantamento.taxaBoletoParecerAgenteFormatado);
    
      this.levantamento.valorFinalParcelaParecerAgente = this.levantamento.valorFinalParcelaParecerAgente + this.levantamento.taxaBoletoParecerAgente;
      this.levantamento.valorFinalParcelaParecerAgenteFormatado = this.converterMoeda(this.levantamento.valorFinalParcelaParecerAgente);
    }
    
    this.levantamento.parcelaAprovadaParecerComite = this.levantamento.valorFinalParcelaParecerAgente;
    this.levantamento.parcelaAprovadaParecerComiteFormatada = this.levantamento.valorFinalParcelaParecerAgenteFormatado;
    
    this.levantamento.valorTotalParecerAgente = this.levantamento.valorFinalParcelaParecerAgente * this.levantamento.qtdParcelasParecerAgente;
    this.levantamento.valorTotalParecerAgenteFormatado = this.converterMoeda(this.levantamento.valorTotalParecerAgente);
    
    this.levantamento.totalReceberParecerComite = this.levantamento.valorTotalParecerAgente;
    this.levantamento.totalReceberParecerComiteFormatado = this.levantamento.valorTotalParecerAgenteFormatado;
  }

  /*verificarCarencia() {
    if (this.levantamento.carenciaParecerComite 
      && this.levantamento.carenciaParecerComite != null) {
        if (this.levantamento.carenciaParecerComite > this.levantamento.linhaCredito.carenciaDias) {
          this.addMessageError({ error: { message: 'A Carência não pode ser maior que a Carência Limite definida pela Linha de Crédito.' } });
          this.levantamento.carenciaParecerComite = undefined;
        } else {
          
        }
    }
  }*/

  verificarTaxaBoleto() {
    
    this.levantamento.valorFinalParcelaParecerAgente = this.levantamento.valorParcelaParecerAgente;
      this.levantamento.valorFinalParcelaParecerAgenteFormatado = this.converterMoeda(this.levantamento.valorFinalParcelaParecerAgente);
    if (this.levantamento.taxaBoletoParecerAgenteFormatado) {
      this.levantamento.taxaBoletoParecerAgente = FormatadoresUtil.parseMoeda(this.levantamento.taxaBoletoParecerAgenteFormatado);
      this.levantamento.valorFinalParcelaParecerAgente = this.levantamento.valorFinalParcelaParecerAgente + this.levantamento.taxaBoletoParecerAgente;
      this.levantamento.valorFinalParcelaParecerAgenteFormatado = this.converterMoeda(this.levantamento.valorFinalParcelaParecerAgente);
    }
    this.levantamento.parcelaAprovadaParecerComite = this.levantamento.valorFinalParcelaParecerAgente;
    this.levantamento.parcelaAprovadaParecerComiteFormatada = this.levantamento.valorFinalParcelaParecerAgenteFormatado;
    
    this.levantamento.valorTotalParecerAgente = this.levantamento.valorFinalParcelaParecerAgente * this.levantamento.qtdParcelasParecerAgente;
    this.levantamento.valorTotalParecerAgenteFormatado = this.converterMoeda(this.levantamento.valorTotalParecerAgente);  
  
    this.levantamento.totalReceberParecerComite = this.levantamento.valorTotalParecerAgente;
    this.levantamento.totalReceberParecerComiteFormatado = this.levantamento.valorTotalParecerAgenteFormatado;
  }

  setLinhaCredito(idLinhaCredito: number): void {
    var linhaCredito;
    this.linhasCredito.forEach(function(element) {
      if (element.id == idLinhaCredito) {
        linhaCredito = element;
      }
    });
    this.levantamento.linhaCredito = linhaCredito;
    this.preencheValoresMonetariosFormatadosLinhaCredito();
  }

  private carregarPessoas(ps: Pessoa[]) {
    this.pessoas = ps;

    this.pessoasFiltered = this.pessoaCtrl.valueChanges.pipe(
      startWith(''),
      map(filter => filter ? this._filterPessoas(filter) : this.pessoas.slice())
    );

    this.avalistasFiltered = this.avalistaCtrl.valueChanges.pipe(
      startWith(''),
      map(filter => filter ? this._filterAvalistas(filter) : this.pessoas.slice())
    );
  }

  private _filterPessoas(value: string): Pessoa[] {
    this.documentoPessoa = value;
    const filterValue = value.toLowerCase();
    return this.pessoas.filter(pessoa => (pessoa.nome != null && pessoa.nome.toLowerCase().indexOf(filterValue) === 0) 
      || (pessoa.documento != null && pessoa.documento.indexOf(filterValue) === 0)
      || (pessoa.nomeFantasia != null && pessoa.nomeFantasia.toLowerCase().indexOf(filterValue) === 0));
  }

  private _filterAvalistas(value: string): Pessoa[] {
    this.documentoAvalista = value;
    const filterValue = value.toLowerCase();
    return this.pessoas.filter(pessoa => (pessoa.nome != null && pessoa.nome.toLowerCase().indexOf(filterValue) === 0) 
      || (pessoa.documento != null && pessoa.documento.indexOf(filterValue) === 0)
      || (pessoa.nomeFantasia != null && pessoa.nomeFantasia.toLowerCase().indexOf(filterValue) === 0));
  }

  private preencherDadosLevantamento(l: Levantamento) {
    this.levantamento = l;
    if (l.pessoa) {
      this.pessoa = l.pessoa;
      this.tipo = this.pessoa.tipo;
      this.linhasCreditoService.recuperarLinhasAtivas(this.tipo).subscribe(
        l => this.linhasCredito = l/*,
        error => this.addMessageError(error)*/);
    }
    if (l.avalistaPessoa) {
      this.avalista = l.avalistaPessoa;
      this.tipoAvalista = this.avalista.tipo;
    }
    if (l.linhaCredito) {
      this.levantamento.idLinhaCredito = l.linhaCredito.id;
      this.preencheValoresMonetariosFormatadosLinhaCredito();
    }
    this.rendaFamiliar = this.levantamento.rendaFamiliar;
    this.cliente = this.levantamento.clientes;
    this.curso = this.levantamento.cursos;
    this.custo = this.levantamento.custos;
    this.experienciaProfissional = this.levantamento.experiencias;
    this.fornecedor = this.levantamento.fornecedores;
    this.gastoFamiliar = this.levantamento.gastos;
    this.historicoVendas = this.levantamento.historicoVendas;
    this.receita = this.levantamento.receitas;
    this.preencheValoresMonetariosFormatados();
    this.undefinedValores();
    this.carregarOutrosGastos();
    this.carregarOutrosCustos();
    if (this.tipoCarregamento) {
      if (this.tipoCarregamento == 'gerarRascunho') {
        this.copiarGerarRascunho();
        this.tipoCarregamento = undefined;
      } else if (this.tipoCarregamento == 'detalheEmprestimo') {
        this.visualizarEmprestimo();
        this.tipoCarregamento = undefined;
      } else if (this.tipoCarregamento == 'gerarEmprestimo') {
        this.gerarEmprestimo();
        this.tipoCarregamento = undefined;
      }
    }
  }

  ngAfterViewChecked() {
    if (this.tipoCarregamento) {
      if (this.tipoCarregamento == 'impressao') {
        //this.btnImprimir.nativeElement.click();
        document.getElementById('btnImprimir').click();
        this.tipoCarregamento = undefined;
      }
    }
  }

  private preencheValoresMonetariosFormatadosLinhaCredito() {
    if (this.levantamento.linhaCredito.taxa) {
      this.levantamento.linhaCredito.taxaFormatada = this.converterMoeda(this.levantamento.linhaCredito.taxa);
    }
    if (this.levantamento.linhaCredito.taxaMinima) {
      this.levantamento.linhaCredito.taxaMinimaFormatada = this.converterMoeda(this.levantamento.linhaCredito.taxaMinima);
    }
    if (this.levantamento.linhaCredito.taxaMaxima) {
      this.levantamento.linhaCredito.taxaMaximaFormatada = this.converterMoeda(this.levantamento.linhaCredito.taxaMaxima);
    }
    if (this.levantamento.linhaCredito.valorMinimo) {
      this.levantamento.linhaCredito.valorMinimoFormatado = this.converterMoeda(this.levantamento.linhaCredito.valorMinimo);
    }
    if (this.levantamento.linhaCredito.valorMaximo) {
      this.levantamento.linhaCredito.valorMaximoFormatado = this.converterMoeda(this.levantamento.linhaCredito.valorMaximo);
    }
  }

  private preencheValoresMonetariosFormatados() {
    if (this.levantamento.gastoTransporteSemVendas) {
      this.levantamento.gastoTransporteSemVendasFormatado = this.converterMoeda(this.levantamento.gastoTransporteSemVendas);
    }
    if (this.levantamento.comissaoVendas) {
      this.levantamento.comissaoVendasFormatada = this.converterMoeda(this.levantamento.comissaoVendas);
    }
    if (this.levantamento.outrosGastos) {
      this.levantamento.outrosGastosFormatado = this.converterMoeda(this.levantamento.outrosGastos);
    }
    if (this.levantamento.aluguelTaxaCondominio) {
      this.levantamento.aluguelTaxaCondominioFormatado = this.converterMoeda(this.levantamento.aluguelTaxaCondominio);
    }
    if (this.levantamento.maoObraTrabalhista) {
      this.levantamento.maoObraTrabalhistaFormatada = this.converterMoeda(this.levantamento.maoObraTrabalhista);
    }
    if (this.levantamento.maoObraTrabalhistaEncargos) {
      this.levantamento.maoObraTrabalhistaEncargosFormatada = this.converterMoeda(this.levantamento.maoObraTrabalhistaEncargos);
    }
    if (this.levantamento.maoObraSemCustoTrabalhista) {
      this.levantamento.maoObraSemCustoTrabalhistaFormatada = this.converterMoeda(this.levantamento.maoObraSemCustoTrabalhista);
    }
    if (this.levantamento.aguaLuzTelefone) {
      this.levantamento.aguaLuzTelefoneFormatado = this.converterMoeda(this.levantamento.aguaLuzTelefone);
    }
    if (this.levantamento.veiculoTransporte) {
      this.levantamento.veiculoTransporteFormatado = this.converterMoeda(this.levantamento.veiculoTransporte);
    }
    if (this.levantamento.contador) {
      this.levantamento.contadorFormatado = this.converterMoeda(this.levantamento.contador);
    }
    if (this.levantamento.prolabore) {
      this.levantamento.prolaboreFormatado = this.converterMoeda(this.levantamento.prolabore);
    }
    if (this.levantamento.manutencao) {
      this.levantamento.manutencaoFormatado = this.converterMoeda(this.levantamento.manutencao);
    }
    if (this.levantamento.subtotalCustos) {
      this.levantamento.subtotalCustosFormatado = this.converterMoeda(this.levantamento.subtotalCustos);
    }
    if (this.levantamento.reservaEmergencia) {
      this.levantamento.reservaEmergenciaFormatada = this.converterMoeda(this.levantamento.reservaEmergencia);
    }
    if (this.levantamento.totalCustos) {
      this.levantamento.totalCustosFormatado = this.converterMoeda(this.levantamento.totalCustos);
    }
    if (this.levantamento.rendaAvalistaMensal) {
      this.levantamento.rendaAvalistaMensalFormatada = this.converterMoeda(this.levantamento.rendaAvalistaMensal);
    }
    if (this.levantamento.receitasOperacionaisDemonstrativo) {
      this.levantamento.receitasOperacionaisDemonstrativoFormatada = this.converterMoeda(this.levantamento.receitasOperacionaisDemonstrativo);
    }
    if (this.levantamento.custosVariaveisDemonstrativo) {
      this.levantamento.custosVariaveisDemonstrativoFormatada = this.converterMoeda(this.levantamento.custosVariaveisDemonstrativo);
    }
    if (this.levantamento.margemContribuicaoDemonstrativo) {
      this.levantamento.margemContribuicaoDemonstrativoFormatada = this.converterMoeda(this.levantamento.margemContribuicaoDemonstrativo);
    }
    if (this.levantamento.custosFixosDemonstrativo) {
      this.levantamento.custosFixosDemonstrativoFormatada = this.converterMoeda(this.levantamento.custosFixosDemonstrativo);
    }
    if (this.levantamento.resultadoOperacionalDemonstrativo) {
      this.levantamento.resultadoOperacionalDemonstrativoFormatado = this.converterMoeda(this.levantamento.resultadoOperacionalDemonstrativo);
    }
    if (this.levantamento.resultadoOperacionalCapacidade) {
      this.levantamento.resultadoOperacionalCapacidadeFormatado = this.converterMoeda(this.levantamento.resultadoOperacionalCapacidade);
    }
    if (this.levantamento.amortizacaoDividaCapacidade) {
      this.levantamento.amortizacaoDividaCapacidadeFormatada = this.converterMoeda(this.levantamento.amortizacaoDividaCapacidade);
    }
    if (this.levantamento.disponibilidadeCapacidade) {
      this.levantamento.disponibilidadeCapacidadeFormatada = this.converterMoeda(this.levantamento.disponibilidadeCapacidade);
    }
    if (this.levantamento.pagamentoMensalCapacidade) {
      this.levantamento.pagamentoMensalCapacidadeFormatado = this.converterMoeda(this.levantamento.pagamentoMensalCapacidade);
    }
    if (this.levantamento.prestacaoEmprestimoCapacidade) {
      this.levantamento.prestacaoEmprestimoCapacidadeFormatada = this.converterMoeda(this.levantamento.prestacaoEmprestimoCapacidade);
    }
    if (this.levantamento.saldoFamiliarMensal) {
      this.levantamento.saldoFamiliarMensalFormatado = this.converterMoeda(this.levantamento.saldoFamiliarMensal);
    }
    if (this.levantamento.creditoMaximoCompativel) {
      this.levantamento.creditoMaximoCompativelFormatado = this.converterMoeda(this.levantamento.creditoMaximoCompativel);
    }
    if (this.levantamento.capacidadePagamentoAvalista) {
      this.levantamento.capacidadePagamentoAvalistaFormatada = this.converterMoeda(this.levantamento.capacidadePagamentoAvalista);
    }
    if (this.levantamento.valorPrestacao) {
      this.levantamento.valorPrestacaoFormatado = this.converterMoeda(this.levantamento.valorPrestacao);
    }
    if (this.levantamento.valorDivida) {
      this.levantamento.valorDividaFormatada = this.converterMoeda(this.levantamento.valorDivida);
    }
    if (this.levantamento.salarioFamiliarComCarteiraAssinada) {
      this.levantamento.salarioFamiliarComCarteiraAssinadaFormatado = this.converterMoeda(this.levantamento.salarioFamiliarComCarteiraAssinada);
    }
    if (this.levantamento.salarioFamiliarSemCarteiraAssinada) {
      this.levantamento.salarioFamiliarSemCarteiraAssinadaFormatado = this.converterMoeda(this.levantamento.salarioFamiliarSemCarteiraAssinada);
    }
    if (this.levantamento.salarioNaoFamiliarComCarteiraAssinada) {
      this.levantamento.salarioNaoFamiliarComCarteiraAssinadaFormatado = this.converterMoeda(this.levantamento.salarioNaoFamiliarComCarteiraAssinada);
    }
    if (this.levantamento.salarioNaoFamiliarSemCarteiraAssinada) {
      this.levantamento.salarioNaoFamiliarSemCarteiraAssinadaFormatado = this.converterMoeda(this.levantamento.salarioNaoFamiliarSemCarteiraAssinada);
    }
    if (this.levantamento.prejuizos) {
      this.levantamento.prejuizosFormatado = this.converterMoeda(this.levantamento.prejuizos);
    }
    if (this.levantamento.creditoSugeridoParecerAgente) {
      this.levantamento.creditoSugeridoParecerAgenteFormatado = this.converterMoeda(this.levantamento.creditoSugeridoParecerAgente);
    }
    if (this.levantamento.valorParcelaParecerAgente) {
      this.levantamento.valorParcelaParecerAgenteFormatado = this.converterMoeda(this.levantamento.valorParcelaParecerAgente);
    }
    if (this.levantamento.valorFinalParcelaParecerAgente) {
      this.levantamento.valorFinalParcelaParecerAgenteFormatado = this.converterMoeda(this.levantamento.valorFinalParcelaParecerAgente);
    }
    if (this.levantamento.taxaJurosParecerAgente) {
      this.levantamento.taxaJurosParecerAgenteFormatado = this.converterMoeda(this.levantamento.taxaJurosParecerAgente);
    }
    if (this.levantamento.valorTotalParecerAgente) {
      this.levantamento.valorTotalParecerAgenteFormatado = this.converterMoeda(this.levantamento.valorTotalParecerAgente);
    }
    if (this.levantamento.taxaBoletoParecerAgente) {
      this.levantamento.taxaBoletoParecerAgenteFormatado = this.converterMoeda(this.levantamento.taxaBoletoParecerAgente);
    }
    if (this.levantamento.creditoAprovadoParecerComite) {
      this.levantamento.creditoAprovadoParecerComiteFormatado = this.converterMoeda(this.levantamento.creditoAprovadoParecerComite);
    }
    if (this.levantamento.parcelaAprovadaParecerComite) {
      this.levantamento.parcelaAprovadaParecerComiteFormatada = this.converterMoeda(this.levantamento.parcelaAprovadaParecerComite);
    }
    if (this.levantamento.totalReceberParecerComite) {
      this.levantamento.totalReceberParecerComiteFormatado = this.converterMoeda(this.levantamento.totalReceberParecerComite);
    }
  }

  private parseValoresMonetariosFormatados() {
    if (this.levantamento.gastoTransporteSemVendasFormatado) {
      this.levantamento.gastoTransporteSemVendas = FormatadoresUtil.parseMoeda(this.levantamento.gastoTransporteSemVendasFormatado);
    }
    if (this.levantamento.comissaoVendasFormatada) {
      this.levantamento.comissaoVendas = FormatadoresUtil.parseMoeda(this.levantamento.comissaoVendasFormatada);
    }
    if (this.levantamento.outrosGastosFormatado) {
      this.levantamento.outrosGastos = FormatadoresUtil.parseMoeda(this.levantamento.outrosGastosFormatado);
    }
    if (this.levantamento.aluguelTaxaCondominioFormatado) {
      this.levantamento.aluguelTaxaCondominio = FormatadoresUtil.parseMoeda(this.levantamento.aluguelTaxaCondominioFormatado);
    }
    if (this.levantamento.maoObraTrabalhistaFormatada) {
      this.levantamento.maoObraTrabalhista = FormatadoresUtil.parseMoeda(this.levantamento.maoObraTrabalhistaFormatada);
    }
    if (this.levantamento.maoObraTrabalhistaEncargosFormatada) {
      this.levantamento.maoObraTrabalhistaEncargos = FormatadoresUtil.parseMoeda(this.levantamento.maoObraTrabalhistaEncargosFormatada);
    }
    if (this.levantamento.maoObraSemCustoTrabalhistaFormatada) {
      this.levantamento.maoObraSemCustoTrabalhista = FormatadoresUtil.parseMoeda(this.levantamento.maoObraSemCustoTrabalhistaFormatada);
    }
    if (this.levantamento.aguaLuzTelefoneFormatado) {
      this.levantamento.aguaLuzTelefone = FormatadoresUtil.parseMoeda(this.levantamento.aguaLuzTelefoneFormatado);
    }
    if (this.levantamento.veiculoTransporteFormatado) {
      this.levantamento.veiculoTransporte = FormatadoresUtil.parseMoeda(this.levantamento.veiculoTransporteFormatado);
    }
    if (this.levantamento.contadorFormatado) {
      this.levantamento.contador = FormatadoresUtil.parseMoeda(this.levantamento.contadorFormatado);
    }
    if (this.levantamento.prolaboreFormatado) {
      this.levantamento.prolabore = FormatadoresUtil.parseMoeda(this.levantamento.prolaboreFormatado);
    }
    if (this.levantamento.manutencaoFormatado) {
      this.levantamento.manutencao = FormatadoresUtil.parseMoeda(this.levantamento.manutencaoFormatado);
    }
    if (this.levantamento.subtotalCustosFormatado) {
      this.levantamento.subtotalCustos = FormatadoresUtil.parseMoeda(this.levantamento.subtotalCustosFormatado);
    }
    if (this.levantamento.reservaEmergenciaFormatada) {
      this.levantamento.reservaEmergencia = FormatadoresUtil.parseMoeda(this.levantamento.reservaEmergenciaFormatada);
    }
    if (this.levantamento.totalCustosFormatado) {
      this.levantamento.totalCustos = FormatadoresUtil.parseMoeda(this.levantamento.totalCustosFormatado);
    }
    if (this.levantamento.rendaAvalistaMensalFormatada) {
      this.levantamento.rendaAvalistaMensal = FormatadoresUtil.parseMoeda(this.levantamento.rendaAvalistaMensalFormatada);
    }
    if (this.levantamento.receitasOperacionaisDemonstrativoFormatada) {
      this.levantamento.receitasOperacionaisDemonstrativo = FormatadoresUtil.parseMoeda(this.levantamento.receitasOperacionaisDemonstrativoFormatada);
    }
    if (this.levantamento.custosVariaveisDemonstrativoFormatada) {
      this.levantamento.custosVariaveisDemonstrativo = FormatadoresUtil.parseMoeda(this.levantamento.custosVariaveisDemonstrativoFormatada);
    }
    if (this.levantamento.margemContribuicaoDemonstrativoFormatada) {
      this.levantamento.margemContribuicaoDemonstrativo = FormatadoresUtil.parseMoeda(this.levantamento.margemContribuicaoDemonstrativoFormatada);
    }
    if (this.levantamento.custosFixosDemonstrativoFormatada) {
      this.levantamento.custosFixosDemonstrativo = FormatadoresUtil.parseMoeda(this.levantamento.custosFixosDemonstrativoFormatada);
    }
    if (this.levantamento.resultadoOperacionalDemonstrativoFormatado) {
      this.levantamento.resultadoOperacionalDemonstrativo = FormatadoresUtil.parseMoeda(this.levantamento.resultadoOperacionalDemonstrativoFormatado);
    }
    if (this.levantamento.resultadoOperacionalCapacidadeFormatado) {
      this.levantamento.resultadoOperacionalCapacidade = FormatadoresUtil.parseMoeda(this.levantamento.resultadoOperacionalCapacidadeFormatado);
    }
    if (this.levantamento.amortizacaoDividaCapacidadeFormatada) {
      this.levantamento.amortizacaoDividaCapacidade = FormatadoresUtil.parseMoeda(this.levantamento.amortizacaoDividaCapacidadeFormatada);
    }
    if (this.levantamento.disponibilidadeCapacidadeFormatada) {
      this.levantamento.disponibilidadeCapacidade = FormatadoresUtil.parseMoeda(this.levantamento.disponibilidadeCapacidadeFormatada);
    }
    if (this.levantamento.pagamentoMensalCapacidadeFormatado) {
      this.levantamento.pagamentoMensalCapacidade = FormatadoresUtil.parseMoeda(this.levantamento.pagamentoMensalCapacidadeFormatado);
    }
    if (this.levantamento.prestacaoEmprestimoCapacidadeFormatada) {
      this.levantamento.prestacaoEmprestimoCapacidade = FormatadoresUtil.parseMoeda(this.levantamento.prestacaoEmprestimoCapacidadeFormatada);
    }
    if (this.levantamento.saldoFamiliarMensalFormatado) {
      this.levantamento.saldoFamiliarMensal = FormatadoresUtil.parseMoeda(this.levantamento.saldoFamiliarMensalFormatado);
    }
    if (this.levantamento.creditoMaximoCompativelFormatado) {
      this.levantamento.creditoMaximoCompativel = FormatadoresUtil.parseMoeda(this.levantamento.creditoMaximoCompativelFormatado);
    }
    if (this.levantamento.capacidadePagamentoAvalistaFormatada) {
      this.levantamento.capacidadePagamentoAvalista = FormatadoresUtil.parseMoeda(this.levantamento.capacidadePagamentoAvalistaFormatada);
    }
    if (this.levantamento.valorPrestacaoFormatado) {
      this.levantamento.valorPrestacao = FormatadoresUtil.parseMoeda(this.levantamento.valorPrestacaoFormatado);
    }
    if (this.levantamento.valorDividaFormatada) {
      this.levantamento.valorDivida = FormatadoresUtil.parseMoeda(this.levantamento.valorDividaFormatada);
    }
    if (this.levantamento.salarioFamiliarComCarteiraAssinadaFormatado) {
      this.levantamento.salarioFamiliarComCarteiraAssinada = FormatadoresUtil.parseMoeda(this.levantamento.salarioFamiliarComCarteiraAssinadaFormatado);
    }
    if (this.levantamento.salarioFamiliarSemCarteiraAssinadaFormatado) {
      this.levantamento.salarioFamiliarSemCarteiraAssinada = FormatadoresUtil.parseMoeda(this.levantamento.salarioFamiliarSemCarteiraAssinadaFormatado);
    }
    if (this.levantamento.salarioNaoFamiliarComCarteiraAssinadaFormatado) {
      this.levantamento.salarioNaoFamiliarComCarteiraAssinada = FormatadoresUtil.parseMoeda(this.levantamento.salarioNaoFamiliarComCarteiraAssinadaFormatado);
    }
    if (this.levantamento.salarioNaoFamiliarSemCarteiraAssinadaFormatado) {
      this.levantamento.salarioNaoFamiliarSemCarteiraAssinada = FormatadoresUtil.parseMoeda(this.levantamento.salarioNaoFamiliarSemCarteiraAssinadaFormatado);
    }
    if (this.levantamento.prejuizosFormatado) {
      this.levantamento.prejuizos = FormatadoresUtil.parseMoeda(this.levantamento.prejuizosFormatado);
    }
    if (this.levantamento.creditoSugeridoParecerAgenteFormatado) {
      this.levantamento.creditoSugeridoParecerAgente = FormatadoresUtil.parseMoeda(this.levantamento.creditoSugeridoParecerAgenteFormatado);
    }
    if (this.levantamento.valorParcelaParecerAgenteFormatado) {
      this.levantamento.valorParcelaParecerAgente = FormatadoresUtil.parseMoeda(this.levantamento.valorParcelaParecerAgenteFormatado);
    }
    
    if (this.levantamento.taxaJurosParecerAgenteFormatado) {
      this.levantamento.taxaJurosParecerAgente = FormatadoresUtil.parseMoeda(this.levantamento.taxaJurosParecerAgenteFormatado);
    }
    if (this.levantamento.valorFinalParcelaParecerAgenteFormatado) {
      this.levantamento.valorFinalParcelaParecerAgente = FormatadoresUtil.parseMoeda(this.levantamento.valorFinalParcelaParecerAgenteFormatado);
    }
    if (this.levantamento.taxaBoletoParecerAgenteFormatado) {
      this.levantamento.taxaBoletoParecerAgente = FormatadoresUtil.parseMoeda(this.levantamento.taxaBoletoParecerAgenteFormatado);
    }
    if (this.levantamento.valorTotalParecerAgenteFormatado) {
      this.levantamento.valorTotalParecerAgente = FormatadoresUtil.parseMoeda(this.levantamento.valorTotalParecerAgenteFormatado);
    }
    if (this.levantamento.creditoAprovadoParecerComiteFormatado) {
      this.levantamento.creditoAprovadoParecerComite = FormatadoresUtil.parseMoeda(this.levantamento.creditoAprovadoParecerComiteFormatado);
    }
    if (this.levantamento.parcelaAprovadaParecerComiteFormatada) {
      this.levantamento.parcelaAprovadaParecerComite = FormatadoresUtil.parseMoeda(this.levantamento.parcelaAprovadaParecerComiteFormatada);
    }
    if (this.levantamento.totalReceberParecerComiteFormatado) {
      this.levantamento.totalReceberParecerComite = FormatadoresUtil.parseMoeda(this.levantamento.totalReceberParecerComiteFormatado);
    }
  }

  ngOnDestroy() {
  }

  carregarPessoa(event: MatAutocompleteSelectedEvent) {
    this.pessoaService.recuperarPorCPF(this.documentoPessoa).subscribe(p => this.definirPessoa(p));
    this.documentoPessoa = null;
  }

  private definirPessoa(p: Pessoa) {
    this.pessoa = new Pessoa();
    if (!p) {
      this.addMessageError({ error: { message: 'Nenhuma pessoa cadastrada com esse CPF ainda. Cadastre essa pessoa na funcionalidade de "Pessoas"' } });
    } else {
      if (p.documento == this.usuario.pessoa.documento) {
        this.addMessageError({ error: { message: 'Não é possível realizar o levantamento para si mesmo.' } });
      } else if (p.dataUltimaConsultaSerasa == null) {
        this.addMessageError({ error: { message: 'A Pessoa deve possuir uma consulta no Serasa.' } });
      } else if (p.dataUltimaConsultaSerasa != null 
        && p.indicadorNomeSujo == null) { 
        this.addMessageError({ error: { message: 'A Pessoa deve possuir uma consulta no Serasa.' } });
      } else if (p.dataUltimaConsultaSerasa != null 
        && p.indicadorNomeSujo != null
        && p.indicadorNomeSujo == 1) { 
        this.addMessageError({ error: { message: 'A Pessoa não deve possuir pendência registrada no Serasa.' } });
      } else if (p.tipo == TipoPessoaEnum.FISICA && p.indDocumentacaoCompletaPf == null) { 
        this.addMessageError({ error: { message: 'A Pessoa Física deve ter sua documentação completa.' } });
      } else if (p.tipo == TipoPessoaEnum.JURIDICA && p.indDocumentacaoCompletaPj == null) { 
        this.addMessageError({ error: { message: 'A Pessoa Jurídica deve ter sua documentação completa.' } });
      } else if (this.avalista && this.avalista != null && this.avalista.id && this.avalista.id != null && this.avalista.id == p.id) {
        this.addMessageError({ error: { message: 'Não é possível que o Avalista e o Beneficiário sejam a mesma pessoal.' } });
      } else if (!p.indicadorPossuiEndereco || p.indicadorPossuiEndereco == null) {
        this.addMessageError({ error: { message: 'Não é possível adicionar uma Pessoa que não tenha pelo menos um endereço cadastrado.' } });
      } else if (p.status == StatusRegistroEnum.ATIVO) {
        this.levantamentosService.recuperarRascunhoPessoa(p.id).subscribe(
          l => this.processarLevantamentoExistente(l, p),
          error => this.addMessageError(error));
      } else {
        this.addMessageError({ error: { message: 'A Pessoa precisa estar ativa no sistema para ser utilizada em outras funcionalidades.' } });
      }
    }
  }

  carregarAvalista(event: MatAutocompleteSelectedEvent) {
    this.pessoaService.recuperarPorCPF(this.documentoAvalista).subscribe(p => this.definirAvalista(p));
    this.documentoAvalista = null;
  }

  private definirAvalista(p: Pessoa) {
    this.avalista = new Pessoa();
    
    if (!p) {
      this.addMessageError({ error: { message: 'Nenhuma pessoa cadastrada com esse CPF ainda. Cadastre essa pessoa na funcionalidade de "Pessoas"' } });
    } else {
      if (p.documento == this.usuario.pessoa.documento) {
        this.addMessageError({ error: { message: 'Não é possível se indicar como avalista.' } });
      } else if (p.dataUltimaConsultaSerasa == null) {
        this.addMessageError({ error: { message: 'A Pessoa deve possuir uma consulta no Serasa.' } });
      } else if (p.dataUltimaConsultaSerasa != null 
        && p.indicadorNomeSujo == null) { 
        this.addMessageError({ error: { message: 'A Pessoa deve possuir uma consulta no Serasa.' } });
      } else if (p.dataUltimaConsultaSerasa != null 
        && p.indicadorNomeSujo != null
        && p.indicadorNomeSujo == 1) { 
        this.addMessageError({ error: { message: 'A Pessoa não deve possuir pendência registrada no Serasa.' } });
      } else if (p.tipo == TipoPessoaEnum.FISICA && p.indDocumentacaoCompletaPf == null) { 
        this.addMessageError({ error: { message: 'A Pessoa Física deve ter sua documentação completa.' } });
      } else if (p.tipo == TipoPessoaEnum.JURIDICA && p.indDocumentacaoCompletaPj == null) { 
        this.addMessageError({ error: { message: 'A Pessoa Jurídica deve ter sua documentação completa.' } });
      } else if (this.pessoa && this.pessoa != null && this.pessoa.id && this.pessoa.id != null && this.pessoa.id == p.id) {
        this.addMessageError({ error: { message: 'Não é possível que o Avalista e o Beneficiário sejam a mesma pessoal.' } });
      } else if (p.status == StatusRegistroEnum.ATIVO) {
        this.avalista = p;
      } else {
        this.addMessageError({ error: { message: 'A Pessoa precisa estar ativa no sistema para ser utilizada em outras funcionalidades.' } });
      }
    }
  }

  private processarLevantamentoExistente(l: Levantamento, p: Pessoa) {
    if (l && l.id != null) {
      this.pessoa = p;
      this.levantamento = l;

      if (l.pessoa) {
        this.pessoa = l.pessoa;
        this.tipo = this.pessoa.tipo;
        this.linhasCreditoService.recuperarLinhasAtivas(this.tipo).subscribe(
          l => this.linhasCredito = l);
      }
      if (l.avalistaPessoa) {
        this.avalista = l.avalistaPessoa;
        this.tipoAvalista = this.avalista.tipo;
      }
      if (l.linhaCredito) {
        this.levantamento.idLinhaCredito = l.linhaCredito.id;
      }
      this.rendaFamiliar = this.levantamento.rendaFamiliar;
      this.cliente = this.levantamento.clientes;
      this.curso = this.levantamento.cursos;
      this.custo = this.levantamento.custos;
      this.experienciaProfissional = this.levantamento.experiencias;
      this.fornecedor = this.levantamento.fornecedores;
      this.gastoFamiliar = this.levantamento.gastos;
      this.historicoVendas = this.levantamento.historicoVendas;
      this.receita = this.levantamento.receitas;
      this.preencheValoresMonetariosFormatados();
      
      this.undefinedValores();
      this.carregarOutrosGastos();
      this.carregarOutrosCustos();
      swal({
        text: 'Já existe um Levantamento Socioeconômico em rascunho para a pessoa indicada. O Levantamento em rascunho foi automaticamente carregado.',
        icon: 'warning',
        buttons: ['Fechar', false]
      });
    } else {
      this.pessoa = p;
      this.linhasCreditoService.recuperarLinhasAtivas(this.pessoa.tipo).subscribe(
        l => this.linhasCredito = l);
    }
  }

  salvarRascunho() {
    if (!this.pessoa || !this.pessoa.id) {
      this.addMessageError({ error: { message: 'Não é possível salvar o rascunho sem uma pessoa definida para o levantamento socioeconômico.' } });
    } else if (!this.avalista || !this.avalista.id) {
      this.addMessageError({ error: { message: 'Não é possível salvar o rascunho sem um avalista definido para o levantamento socioeconômico.' } });
    } else {
      this.levantamento.status = StatusLevantamentoEnum.RASCUNHO;
      if (!this.levantamento.pessoa) {
        this.levantamento.pessoa = new Pessoa();
        this.levantamento.pessoa.id = this.pessoa.id;
      }
      if (!this.levantamento.avalistaPessoa) {
        this.levantamento.avalistaPessoa = new Pessoa();
        this.levantamento.avalistaPessoa.id = this.avalista.id;
      }
      this.preencherListas();
      this.parseValoresMonetariosFormatados();
      
      this.levantamentosService.salvar(this.levantamento).subscribe(
        l => this.processarLevantamentoRascunho(l),
        error => this.addMessageError(error));
    }
  }

  converterMoeda(moeda: number) {
    var moedaFormatada = '';
    if (moeda != null) {
      moedaFormatada = FormatadoresUtil.formatarMoeda(moeda);
    }
    return moedaFormatada;
  }

  getDescricaoConceitoVenda(conceitoVenda: number) {
    var descricao = '';
    if (conceitoVenda != null) {
        if (conceitoVenda == ConceitoVendaEnum.MUITO_BOM) {
            descricao = 'Muito Bom';
        } else if (conceitoVenda == ConceitoVendaEnum.BOM) {
            descricao = 'Bom';
        } else if (conceitoVenda == ConceitoVendaEnum.REGULAR) {
            descricao = 'Regular';
        } else if (conceitoVenda == ConceitoVendaEnum.FRACO) {
            descricao = 'Fraco';
        }
    }
    return descricao;
  }

  getDescricaoTipo(tipo: number) {
    var descricao = '';
    if (tipo != null) {
        if (tipo == TipoGastoEnum.ALIMENTACAO_HIGIENE_LIMPEZA) {
            descricao = 'Alimentaçãoo / Higiene / Limpeza';
        } else if (tipo == TipoGastoEnum.SAUDE) {
            descricao = 'Saúde (remédios / médicos / plano de saúde)';
        } else if (tipo == TipoGastoEnum.EDUCACAO) {
            descricao = 'Educação';
        } else if (tipo == TipoGastoEnum.ALUGUEL) {
            descricao = 'Aluguel / condomínio/ prestação da casa própria';
        } else if (tipo == TipoGastoEnum.AGUA_LUZ) {
            descricao = 'Água / luz / telefone / Gás / Internet';
        } else if (tipo == TipoGastoEnum.TRANSPORTE) {
            descricao = 'Transporte';
        } else if (tipo == TipoGastoEnum.LAZER) {
            descricao = 'Lazer';
        } else if (tipo == TipoGastoEnum.OUTRO) {
            descricao = 'Outro';
        }
    }
    return descricao;
  }

  private processarLevantamentoRascunho(l: Levantamento) {
    this.levantamento = l;

    if (l.pessoa) {
      this.pessoa = l.pessoa;
      this.tipo = this.pessoa.tipo;
      this.linhasCreditoService.recuperarLinhasAtivas(this.tipo).subscribe(
        l => this.linhasCredito = l);
    }
    if (l.avalistaPessoa) {
      this.avalista = l.avalistaPessoa;
      this.tipoAvalista = this.avalista.tipo;
    }
    if (l.linhaCredito) {
      this.levantamento.idLinhaCredito = l.linhaCredito.id;
    }
    this.rendaFamiliar = this.levantamento.rendaFamiliar;
    this.cliente = this.levantamento.clientes;
    this.curso = this.levantamento.cursos;
    this.custo = this.levantamento.custos;
    this.experienciaProfissional = this.levantamento.experiencias;
    this.fornecedor = this.levantamento.fornecedores;
    this.gastoFamiliar = this.levantamento.gastos;
    this.historicoVendas = this.levantamento.historicoVendas;
    this.receita = this.levantamento.receitas;
    this.preencheValoresMonetariosFormatados();
    
    this.undefinedValores();
    this.carregarOutrosGastos();
    this.carregarOutrosCustos();
    swal({
      text: 'Rascunho de Levantamento Socioeconômico salvo com sucesso.',
      icon: 'success',
      buttons: ['Fechar', false]
    });
  }

  finalizar() {
    if(this.form.valid){
      this.preencherListas();
      this.parseValoresMonetariosFormatados();
      this.levantamento.status = StatusLevantamentoEnum.FINALIZADO;
      this.levantamentosService.finalizar(this.levantamento).subscribe(
        l => this.processarLevantamento(l),
        error => this.addMessageError(error)
      );
    }
  }

  private preencherListas() {
    this.levantamento.rendaFamiliar = this.rendaFamiliar;
    this.levantamento.clientes = this.cliente;
    this.levantamento.cursos = this.curso;
    this.levantamento.custos = this.custo;
    this.levantamento.experiencias = this.experienciaProfissional;
    this.levantamento.fornecedores = this.fornecedor;
    this.levantamento.gastos = this.gastoFamiliar;
    this.levantamento.historicoVendas = this.historicoVendas;
    this.levantamento.receitas = this.receita;
  }

  private processarLevantamento(l: Levantamento) {
    swal({
      text: 'Levantamento Socioeconômico finalizado com sucesso.',
      icon: 'success',
      buttons: ['Fechar', false]
    });
  }

  adicionarRendaFamiliar() {
    var verifica = false;
    var mensagens = '';
    if (!this.levantamentoRendaFamiliar.nome) {
      verifica = true;
      mensagens = mensagens + 'O Nome do familiar é obrigatório.<br />';
    }
    if (!this.levantamentoRendaFamiliar.fonteRenda) {
      verifica = true;
      mensagens = mensagens + 'A Fonte de Renda do familiar é obrigatório.<br />';
    }
    if (!this.levantamentoRendaFamiliar.rendaMensalFormatada) {
      verifica = true;
      mensagens = mensagens + 'A Renda Mensal do familiar é obrigatório.<br />';
    }
    if (!verifica) {
      this.levantamentoRendaFamiliar.rendaMensal = FormatadoresUtil.parseMoeda(this.levantamentoRendaFamiliar.rendaMensalFormatada);
      if (!this.rendaFamiliar) {
        this.rendaFamiliar = new Array();
        this.rendaFamiliar.push(this.levantamentoRendaFamiliar);
      } else {
        this.rendaFamiliar.push(this.levantamentoRendaFamiliar);
      }
      this.levantamentoRendaFamiliar = new LevantamentoRendaFamiliar();
    } else {
      this.addMessageErrorHtml({ error: { message: mensagens } });
    }
  }

  removerRendaFamiliar(index: number) {
    if (this.rendaFamiliar) {
      this.rendaFamiliar.splice(index, 1);
    }
  }

  adicionarGastoFamiliar() {
    var verifica = false;
    var mensagens = '';
    if (!this.levantamentoGastoFamiliar.tipo) {
      verifica = true;
      mensagens = mensagens + 'O Tipo de Gasto é obrigatório.<br />';
    }
    if (!this.levantamentoGastoFamiliar.valorFormatado) {
      verifica = true;
      mensagens = mensagens + 'O Valor do Gasto é obrigatório.<br />';
    }
    if (!verifica) {
      this.levantamentoGastoFamiliar.valor = FormatadoresUtil.parseMoeda(this.levantamentoGastoFamiliar.valorFormatado);
      if (!this.gastoFamiliar) {
        this.gastoFamiliar = new Array();
        this.gastoFamiliar.push(this.levantamentoGastoFamiliar);
      } else {
        this.gastoFamiliar.push(this.levantamentoGastoFamiliar);
      }
      this.levantamentoGastoFamiliar = new LevantamentoGastoFamiliar();
    } else {
      this.addMessageErrorHtml({ error: { message: mensagens } });
    }
  }

  removerGastoFamiliar(index: number) {
    if (this.gastoFamiliar) {
      this.gastoFamiliar.splice(index, 1);
    }
  }

  adicionarExperienciaProfissional() {
    var verifica = false;
    var mensagens = '';
    if (!this.levantamentoExperienciaProfissional.localTrabalho) {
      verifica = true;
      mensagens = mensagens + 'O Local de Trabalho é obrigatório.<br />';
    }
    if (!this.levantamentoExperienciaProfissional.meses) {
      verifica = true;
      mensagens = mensagens + 'O tempo em meses é obrigatório.<br />';
    }
    if (!this.levantamentoExperienciaProfissional.funcao) {
      verifica = true;
      mensagens = mensagens + 'A Função é obrigatória.<br />';
    }
    if (!verifica) {
      if (!this.custo) {
        this.experienciaProfissional = new Array();
        this.experienciaProfissional.push(this.levantamentoExperienciaProfissional);
      } else {
        this.experienciaProfissional.push(this.levantamentoExperienciaProfissional);
      }
      this.levantamentoExperienciaProfissional = new LevantamentoExperienciaProfissional();
    } else {
      this.addMessageErrorHtml({ error: { message: mensagens } });
    }
  }

  removerExperienciaProfissional(index: number) {
    if (this.experienciaProfissional) {
      this.experienciaProfissional.splice(index, 1);
    }
  }

  adicionarCurso() {
    var verifica = false;
    var mensagens = '';
    if (!this.levantamentoCurso.nome) {
      verifica = true;
      mensagens = mensagens + 'O Nome do Curso é obrigatório.<br />';
    }
    if (!this.levantamentoCurso.instituicao) {
      verifica = true;
      mensagens = mensagens + 'A Instituição do Curso é obrigatória.<br />';
    }
    if (!verifica) {
      if (!this.curso) {
        this.curso = new Array();
        this.curso.push(this.levantamentoCurso);
      } else {
        this.curso.push(this.levantamentoCurso);
      }
      this.levantamentoCurso = new LevantamentoCurso();
    } else {
      this.addMessageErrorHtml({ error: { message: mensagens } });
    }
  }

  removerCurso(index: number) {
    if (this.curso) {
      this.curso.splice(index, 1);
    }
  }

  adicionarReceita() {
    var verifica = false;
    var mensagens = '';
    if (!this.levantamentoReceita.mercadoria) {
      verifica = true;
      mensagens = mensagens + 'A Mercadoria / Produto / Serviço é obrigatório.<br />';
    }
    if (!this.levantamentoReceita.unidade) {
      verifica = true;
      mensagens = mensagens + 'A Unidade é obrigatória.<br />';
    }
    if (!this.levantamentoReceita.precoFormatado) {
      verifica = true;
      mensagens = mensagens + 'O Preço é obrigatório.<br />';
    }
    if (!this.levantamentoReceita.qtd) {
      verifica = true;
      mensagens = mensagens + 'A Quantidade é obrigatória.<br />';
    }
    if (!verifica) {
      this.levantamentoReceita.preco = FormatadoresUtil.parseMoeda(this.levantamentoReceita.precoFormatado);
      if (!this.receita) {
        this.receita = new Array();
        this.receita.push(this.levantamentoReceita);
      } else {
        this.receita.push(this.levantamentoReceita);
      }
      this.levantamentoReceita = new LevantamentoReceita();
    } else {
      this.addMessageErrorHtml({ error: { message: mensagens } });
    }
  }

  removerReceita(index: number) {
    if (this.receita) {
      this.receita.splice(index, 1);
    }
  }

  adicionarCusto() {
    var verifica = false;
    var mensagens = '';
    if (!this.levantamentoCusto.mercadoria) {
      verifica = true;
      mensagens = mensagens + 'A Mercadoria / Produto / Serviço é obrigatório.<br />';
    }
    if (!this.levantamentoCusto.unidade) {
      verifica = true;
      mensagens = mensagens + 'A Unidade é obrigatória.<br />';
    }
    if (!this.levantamentoCusto.precoFormatado) {
      verifica = true;
      mensagens = mensagens + 'O Preço é obrigatório.<br />';
    }
    if (!this.levantamentoCusto.qtd) {
      verifica = true;
      mensagens = mensagens + 'A Quantidade é obrigatória.<br />';
    }
    if (!verifica) {
      this.levantamentoCusto.preco = FormatadoresUtil.parseMoeda(this.levantamentoCusto.precoFormatado);
      if (!this.custo) {
        this.custo = new Array();
        this.custo.push(this.levantamentoCusto);
      } else {
        this.custo.push(this.levantamentoCusto);
      }
      this.levantamentoCusto = new LevantamentoCusto();
    } else {
      this.addMessageErrorHtml({ error: { message: mensagens } });
    }
  }

  removerCusto(index: number) {
    if (this.custo) {
      this.custo.splice(index, 1);
    }
  }

  adicionarCliente() {
    var verifica = false;
    var mensagens = '';
    if (!this.levantamentoCliente.nome) {
      verifica = true;
      mensagens = mensagens + 'O Nome é obrigatório.<br />';
    }
    if (!this.levantamentoCliente.porcentagem) {
      verifica = true;
      mensagens = mensagens + 'A Porcentagem é obrigatória.<br />';
    }
    if (!verifica) {
      if (!this.cliente) {
        this.cliente = new Array();
        this.cliente.push(this.levantamentoCliente);
      } else {
        this.cliente.push(this.levantamentoCliente);
      }
      this.levantamentoCliente = new LevantamentoCliente();
    } else {
      this.addMessageErrorHtml({ error: { message: mensagens } });
    }
  }

  removerCliente(index: number) {
    if (this.cliente) {
      this.cliente.splice(index, 1);
    }
  }

  adicionarFornecedor() {
    var verifica = false;
    var mensagens = '';
    if (!this.levantamentoFornecedor.nome) {
      verifica = true;
      mensagens = mensagens + 'O Nome é obrigatório.<br />';
    }
    if (!this.levantamentoFornecedor.tipoProduto) {
      verifica = true;
      mensagens = mensagens + 'O Tipo de Produto / Mercadoria / Serviço é obrigatório.<br />';
    }
    if (!this.levantamentoFornecedor.frequenciaCompras) {
      verifica = true;
      mensagens = mensagens + 'A Frequência de Compras é obrigatória.<br />';
    }
    if (!verifica) {
      if (!this.fornecedor) {
        this.fornecedor = new Array();
        this.fornecedor.push(this.levantamentoFornecedor);
      } else {
        this.fornecedor.push(this.levantamentoFornecedor);
      }
      this.levantamentoFornecedor = new LevantamentoFornecedor();
    } else {
      this.addMessageErrorHtml({ error: { message: mensagens } });
    }
  }

  removerFornecedor(index: number) {
    if (this.fornecedor) {
      this.fornecedor.splice(index, 1);
    }
  }

  adicionarHistoricoVendas() {
    var verifica = false;
    var mensagens = '';
    if (!this.levantamentoHistoricoVendas.mesAno) {
      verifica = true;
      mensagens = mensagens + 'O Mês/Ano é obrigatório.<br />';
    }
    if (!this.levantamentoHistoricoVendas.valorFormatado) {
      verifica = true;
      mensagens = mensagens + 'O Valor é obrigatório.<br />';
    }
    if (!this.levantamentoHistoricoVendas.conceitoVenda) {
      verifica = true;
      mensagens = mensagens + 'O Conceito da Venda é obrigatório.<br />';
    }
    if (!verifica) {
      this.levantamentoHistoricoVendas.valor = FormatadoresUtil.parseMoeda(this.levantamentoHistoricoVendas.valorFormatado);
      if (!this.fornecedor) {
        this.historicoVendas = new Array();
        this.historicoVendas.push(this.levantamentoHistoricoVendas);
      } else {
        this.historicoVendas.push(this.levantamentoHistoricoVendas);
      }
      this.levantamentoHistoricoVendas = new LevantamentoHistoricoVendas();
    } else {
      this.addMessageErrorHtml({ error: { message: mensagens } });
    }
  }

  descricaoEstadoCivil(p: Pessoa) {
    var descricao = 'Não Informado';
    if (p.estadoCivil != null) {
        if (p.estadoCivil == EstadoCivilEnum.SOLTEIRO) {
            descricao = 'Solteiro';
        } else if (p.estadoCivil == EstadoCivilEnum.CASADO) {
            descricao = 'Casado';
        } else if (p.estadoCivil == EstadoCivilEnum.SEPARADO) {
            descricao = 'Separado';
        } else if (p.estadoCivil == EstadoCivilEnum.DIVORCIADO) {
            descricao = 'Divorciado';
        } else if (p.estadoCivil == EstadoCivilEnum.VIUVO) {
            descricao = 'Viúvo';
        } else if (p.estadoCivil == EstadoCivilEnum.UNIAO_ESTAVEL) {
            descricao = 'União Estável';
        }
    }
    return descricao;
  }

  descricaoGrauFormatacao(grau: number) {
    var descricao = '';
    if (grau != null) {
      if (grau == ExperienciaProfissionalEnum.FUNDAMENTAL) {
        descricao = 'Fundamental';
      } else if (grau == ExperienciaProfissionalEnum.MEDIO) {
          descricao = 'Médio';
      } else if (grau == ExperienciaProfissionalEnum.SUPERIOR) {
          descricao = 'Superior';
      }
    }
    return descricao;
  }

  descricaoTipoNegocio(tipoNegocio: number) {
    var descricao = '';
    if (tipoNegocio != null) {
      if (tipoNegocio == TipoNegocioEnum.INDUSTRIA) {
        descricao = 'Indústria';
      } else if (tipoNegocio == TipoNegocioEnum.COMERCIO) {
          descricao = 'Comércio';
      } else if (tipoNegocio == TipoNegocioEnum.SERVICOS) {
          descricao = 'Serviços';
      }
    }
    return descricao;
  }

  descricaoPonto(ponto: number) {
    var descricao = '';
    if (ponto != null) {
      if (ponto == PontoEnum.FIXO) {
        descricao = 'Fixo';
      } else if (ponto == PontoEnum.A_DOMICILIO) {
          descricao = 'Seriviço à Domicílio';
      } else if (ponto == PontoEnum.FEIRANTE) {
          descricao = 'Feirante';
      } else if (ponto == PontoEnum.OUTRO) {
        descricao = 'Outro';
      }
    }
    return descricao;
  }

  descricaoLocal(local: number) {
    var descricao = '';
    if (local != null) {
      if (local == LocalEnum.PROPRIO) {
        descricao = 'Próprio';
      } else if (local == LocalEnum.ALUGADO) {
          descricao = 'Alugado';
      } else if (local == LocalEnum.TEMPORARIO) {
          descricao = 'Temporário';
      } else if (local == LocalEnum.CONTRATO_ATE) {
        descricao = 'Contrato Até';
      }
    }
    return descricao;
  }

  descricaoAtividade(atividade: number) {
    var descricao = '';
    if (atividade != null) {
      if (atividade == AtividadeEnum.INFORMAL) {
        descricao = 'Informal';
      } else if (atividade == AtividadeEnum.MEI) {
          descricao = 'MEI';
      } else if (atividade == AtividadeEnum.EPP) {
          descricao = 'EPP';
      } else if (atividade == AtividadeEnum.LIMITADA) {
        descricao = 'Limitada';
      } else if (atividade == AtividadeEnum.EIRELI) {
        descricao = 'EIRELI';
      } else if (atividade == AtividadeEnum.ME) {
        descricao = 'ME';
      }
    }
    return descricao;
  }

  descricaoSituacaoNome(p: Pessoa) {
    var descricao = 'Não Analisado';
    if (p.indicadorNomeSujo != null) {
        if (p.indicadorNomeSujo == 1) {
            descricao = 'Nome Negativado';
        } else {
            descricao = 'Nome Positivado';
        }
    }
    return descricao;
  }

  descricaoSimNao(simNao: number) {
    var descricao = '';
    if (simNao != null) {
      if (simNao == 1) {
        descricao = 'Sim';
      } else {
        descricao = 'Não';
      }
    }
    return descricao;
  }

  descricaoConceitoVenda(conceitoVenda: number) {
    var descricao = '';
    if (conceitoVenda != null) {
      if (conceitoVenda == ConceitoVendaEnum.MUITO_BOM) {
        descricao = 'Muito Bom';
      } else if (conceitoVenda == ConceitoVendaEnum.BOM) {
          descricao = 'Bom';
      } else if (conceitoVenda == ConceitoVendaEnum.REGULAR) {
          descricao = 'Regular';
      } else if (conceitoVenda == ConceitoVendaEnum.FRACO) {
        descricao = 'Fraco';
      }
    }
    return descricao;
  }

  descricaoImposto(imposto: number) {
    var descricao = '';
    if (imposto != null) {
      if (imposto == ImpostoEnum.INDUSTRIA) {
        descricao = 'Indústria';
      } else if (imposto == ImpostoEnum.COMERCIO) {
          descricao = 'Comércio';
      } else if (imposto == ImpostoEnum.SERVICOS) {
          descricao = 'Serviços';
      }
    }
    return descricao;
  }

  descricaoTipoRenda(tipoRenda: number) {
    var descricao = '';
    if (tipoRenda != null) {
      if (tipoRenda == TipoRendaEnum.INSS) {
        descricao = 'INSS';
      } else if (tipoRenda == TipoRendaEnum.CONTRACHEQUE) {
          descricao = 'Contracheque';
      } else if (tipoRenda == TipoRendaEnum.IRPF) {
          descricao = 'IRPF';
      } else if (tipoRenda == TipoRendaEnum.OUTROS) {
        descricao = 'Outros';
      }
    }
    return descricao;
  }

  descricaoComunicadoCliente(comunicadoCliente: number) {
    var descricao = '';
    if (comunicadoCliente != null) {
      if (comunicadoCliente == ComunicadoClienteEnum.TELEFONE_RESIDENCIAL) {
        descricao = 'Telefone Residencial';
      } else if (comunicadoCliente == ComunicadoClienteEnum.CELULAR) {
          descricao = 'Celular';
      } else if (comunicadoCliente == ComunicadoClienteEnum.PESSOALMENTE) {
          descricao = 'Pessoalmente';
      } else if (comunicadoCliente == ComunicadoClienteEnum.MENSAGEM_TEXTO_SMS) {
        descricao = 'Mensagem de Texto (SMS)';
      } else if (comunicadoCliente == ComunicadoClienteEnum.MENSAGEM_TEXTO_WHATSAPP) {
        descricao = 'Mensagem de Texto (WhatsApp)';
      } else if (comunicadoCliente == ComunicadoClienteEnum.MENSAGEM_TEXTO_TELEGRAM) {
        descricao = 'Mensagem de Texto (Telegram)';
      } else if (comunicadoCliente == ComunicadoClienteEnum.CORRESPONDENCIA) {
        descricao = 'Mensagem de Texto (Correnspondência)';
      }
    }
    return descricao;
  }

  removerHistoricoVendas(index: number) {
    if (this.historicoVendas) {
      this.historicoVendas.splice(index, 1);
    }
  }
  
  desabilitado() {
    return !(this.pessoa && this.pessoa.id) || !(this.avalista && this.avalista.id) || !(!this.levantamento.status || this.status.RASCUNHO == this.levantamento.status);
  }

  copiarGerarRascunho() {
    this.levantamentosService.copiar(this.levantamento.id).subscribe(
      l => this.carregarRascunhoLevantamento(l),
      error => this.addMessageError(error));
  }

  private carregarRascunhoLevantamento(l: Levantamento) {
    swal({
      text: 'Rascunho gerado com sucesso.',
      icon: 'success',
      buttons: ['Fechar', false]
    });
    this.router.navigate(['/pages/levantamento-novo'], { queryParams: { idLevantamento: l.id } });
  }

  validaPossibilidadeEmprestimo() {
    return (this.status.FINALIZADO === this.levantamento.status) 
      && (!this.levantamento.idEmprestimo || this.levantamento.idEmprestimo == null) 
      && (!this.levantamento.creditoNegadoMotivoParecerComite || this.levantamento.creditoNegadoMotivoParecerComite == null) 
      && this.levantamento.creditoAprovadoParecerComiteFormatado
      && this.levantamento.totalReceberParecerComiteFormatado
      && this.levantamento.parcelaAprovadaParecerComiteFormatada
      && this.levantamento.qtdParcelasParecerAgente
      && this.levantamento.vencimentoParcelasParecerComite
      && this.levantamento.linhaCredito;
  }

  gerarEmprestimo() {
    this.emprestimo = new Emprestimo();
    this.emprestimo.levantamento = this.levantamento;
    this.emprestimo.linhaCredito = this.levantamento.linhaCredito;
    this.emprestimo.valorSolicitado = this.levantamento.creditoAprovadoParecerComite;
    this.emprestimo.valorSolicitadoFormatado = this.levantamento.creditoAprovadoParecerComiteFormatado;
    this.emprestimo.valorFinal = this.levantamento.creditoAprovadoParecerComite;
    this.emprestimo.valorFinalFormatado = this.levantamento.creditoAprovadoParecerComiteFormatado;
    this.emprestimo.numeroParcelas = this.levantamento.qtdParcelasParecerAgente;
    this.emprestimo.taxaAnualFormatado = this.levantamento.taxaJurosParecerAgenteFormatado;
    this.emprestimo.taxaAnual = this.levantamento.taxaJurosParecerAgente;
    this.emprestimo.valorParcelaFormatado = this.levantamento.valorFinalParcelaParecerAgenteFormatado;
    this.emprestimo.valorParcela = this.levantamento.valorFinalParcelaParecerAgente;
    this.modal.open();
  }

  salvarEmprestimo() {
    
    this.modal.close();
    this.emprestimosService.salvar(this.emprestimo).subscribe(
      e => this.emprestimoSalvo(e),
      error => this.addMessageError(error));
  }

  emprestimoSalvo(e: Emprestimo) {
    this.levantamento.idEmprestimo = e.id;
    swal({
      text: 'Empréstimo criado com sucesso.',
      icon: 'success',
      buttons: ['Fechar', false]
    });
    this.router.navigate(['/pages/emprestimo-detalhe'], { queryParams: { idEmprestimo: e.id } });
  }

  carregarValorParcela() {
    if (this.emprestimo.numeroParcelas && this.emprestimo.taxaMensalFormatado) {
      this.parseValoresMonetariosEmprestimoFormatados();
      var dias = this.emprestimo.numeroParcelas*30;
      //valor presente: 1.000; taxa de juros: 0,1059%; número de períodos: 70
      //Solução: F = 1000*(1 + 0,1059%)70 = 1076,91
      var tempo = this.emprestimo.numeroParcelas / 12;
      this.emprestimo.valorParcela = (this.emprestimo.valorFinal * Math.pow((1 + (this.emprestimo.taxaMensal / 100)), dias)) / this.emprestimo.numeroParcelas;
      this.preencheValoresMonetariosEmprestimoFormatados();
    }
  }

  visualizarEmprestimo() {
    this.emprestimosService.recuperarPorId(this.levantamento.idEmprestimo).subscribe(
      e => this.preencherDadosEmprestimo(e),
      error => this.addMessageError(error));
    this.modal.open();
  }

  private preencherDadosEmprestimo(e: Emprestimo) {
    this.emprestimo = e;
    this.preencheValoresMonetariosEmprestimoFormatados();
  }

  private preencheValoresMonetariosEmprestimoFormatados() {
    if (this.emprestimo.valorParcela) {
      this.emprestimo.valorParcelaFormatado = this.converterMoeda(this.emprestimo.valorParcela);
    }
    if (this.emprestimo.valorSolicitado) {
      this.emprestimo.valorSolicitadoFormatado = this.converterMoeda(this.emprestimo.valorSolicitado);
    }
    if (this.emprestimo.valorFinal) {
      this.emprestimo.valorFinalFormatado = this.converterMoeda(this.emprestimo.valorFinal);
    }
    if (this.emprestimo.saldoDevedor) {
      this.emprestimo.saldoDevedorFormatado = this.converterMoeda(this.emprestimo.saldoDevedor);
    }
    if (this.emprestimo.taxaAnual) {
      this.emprestimo.taxaAnualFormatado = this.converterMoeda(this.emprestimo.taxaAnual);
    }
    if (this.emprestimo.taxaMensal) {
      this.emprestimo.taxaMensalFormatado = this.converterMoeda(this.emprestimo.taxaMensal);
    }
    if (this.emprestimo.taxaAnualRenegociacao1) {
      this.emprestimo.taxaAnualRenegociacao1Formatado = this.converterMoeda(this.emprestimo.taxaAnualRenegociacao1);
    }
    if (this.emprestimo.taxaMensalRenegociacao1) {
      this.emprestimo.taxaMensalRenegociacao1Formatado = this.converterMoeda(this.emprestimo.taxaMensalRenegociacao1);
    }
    if (this.emprestimo.taxaAnualRenegociacao2) {
      this.emprestimo.taxaAnualRenegociacao2Formatado = this.converterMoeda(this.emprestimo.taxaAnualRenegociacao2);
    }
    if (this.emprestimo.taxaMensalRenegociacao2) {
      this.emprestimo.taxaMensalRenegociacao2Formatado = this.converterMoeda(this.emprestimo.taxaMensalRenegociacao2);
    }
    if (this.emprestimo.taxaAnualRenegociacao3) {
      this.emprestimo.taxaAnualRenegociacao3Formatado = this.converterMoeda(this.emprestimo.taxaAnualRenegociacao3);
    }
    if (this.emprestimo.taxaMensalRenegociacao3) {
      this.emprestimo.taxaMensalRenegociacao3Formatado = this.converterMoeda(this.emprestimo.taxaMensalRenegociacao3);
    }

  }

  private parseValoresMonetariosEmprestimoFormatados() {
    if (this.emprestimo.valorParcelaFormatado) {
      this.emprestimo.valorParcela = FormatadoresUtil.parseMoeda(this.emprestimo.valorParcelaFormatado);
    }
    if (this.emprestimo.valorSolicitadoFormatado) {
      this.emprestimo.valorSolicitado = FormatadoresUtil.parseMoeda(this.emprestimo.valorSolicitadoFormatado);
    }
    if (this.emprestimo.valorFinalFormatado) {
      this.emprestimo.valorFinal = FormatadoresUtil.parseMoeda(this.emprestimo.valorFinalFormatado);
    }
    if (this.emprestimo.saldoDevedorFormatado) {
      this.emprestimo.saldoDevedor = FormatadoresUtil.parseMoeda(this.emprestimo.saldoDevedorFormatado);
    }
    if (this.emprestimo.taxaAnualFormatado) {
      this.emprestimo.taxaAnual = FormatadoresUtil.parseMoeda(this.emprestimo.taxaAnualFormatado);
    }
    if (this.emprestimo.taxaMensalFormatado) {
      this.emprestimo.taxaMensal = FormatadoresUtil.parseMoeda(this.emprestimo.taxaMensalFormatado);
    }
    if (this.emprestimo.taxaAnualRenegociacao1Formatado) {
      this.emprestimo.taxaAnualRenegociacao1 = FormatadoresUtil.parseMoeda(this.emprestimo.taxaAnualRenegociacao1Formatado);
    }
    if (this.emprestimo.taxaMensalRenegociacao1Formatado) {
      this.emprestimo.taxaMensalRenegociacao1 = FormatadoresUtil.parseMoeda(this.emprestimo.taxaMensalRenegociacao1Formatado);
    }
    if (this.emprestimo.taxaAnualRenegociacao2Formatado) {
      this.emprestimo.taxaAnualRenegociacao2 = FormatadoresUtil.parseMoeda(this.emprestimo.taxaAnualRenegociacao2Formatado);
    }
    if (this.emprestimo.taxaMensalRenegociacao2Formatado) {
      this.emprestimo.taxaMensalRenegociacao2 = FormatadoresUtil.parseMoeda(this.emprestimo.taxaMensalRenegociacao2Formatado);
    }
    if (this.emprestimo.taxaAnualRenegociacao3Formatado) {
      this.emprestimo.taxaAnualRenegociacao3 = FormatadoresUtil.parseMoeda(this.emprestimo.taxaAnualRenegociacao3Formatado);
    }
    if (this.emprestimo.taxaMensalRenegociacao3Formatado) {
      this.emprestimo.taxaMensalRenegociacao3 = FormatadoresUtil.parseMoeda(this.emprestimo.taxaMensalRenegociacao3Formatado);
    }
  }

}
