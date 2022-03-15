import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Levantamento } from '../../../../models/levantamento';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from '../../../../models/pessoa';
import { Emprestimo } from '../../../../models/emprestimo';
import { Parcela } from '../../../../models/parcela';
import { Boleto } from '../../../../models/boleto';
import { PessoaService } from '../../../../services/pessoa.service';
import { LevantamentosService } from '../../../../services/levantamentos.service';
import { EmprestimosService } from '../../../../services/emprestimos.service';
import { LinhasCreditoService } from '../../../../services/linhas-credito.service';
import { ParametroBoletoService } from '../../../../services/parametro-boleto.service';
import { Store, select } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { Observable, of } from 'rxjs';
import swal from 'sweetalert';
import { PaginationLoadLazy, PageQuery } from '../../../../util/pagination';
import { tap } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { BaseComponent } from '../../../base.components';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Usuario } from '../../../../models/usuario';
import { LinhaCredito } from '../../../../models/linha-credito';
import { FormatadoresUtil } from '../../../../util/formatadores';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { selectUsuarioLogado } from '../../../../public/login/selectors/login.selectors';
import { SituacaoParcelaEnum } from '../../../../enums/situacao.parcela';
import { ManutParametroBoletoVo } from '../../../../vo/manut-parametro-boleto.vo';

import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-emprestimo-detalhe',
  templateUrl: './emprestimo-detalhe.component.html',
  styleUrls: ['./emprestimo-detalhe.component.scss']
})
export class EmprestimoDetalheComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('btnImprimir', {static: false}) 
  btnImprimir: ElementRef;

  pt: Object = languageCalendar

  usuarioLogado$: Observable<Usuario>;
  usuario: Usuario;
  idEmprestimo: number;
  emprestimo: Emprestimo = new Emprestimo();
  parcelas: Array<Parcela>;
  status = StatusRegistroEnum;
  boleto: Boleto = new Boleto();
  parametroBoleto: ManutParametroBoletoVo = new ManutParametroBoletoVo();

  constructor(private store: Store<AppState>, 
    private pessoaService : PessoaService,
    private levantamentosService: LevantamentosService, 
    private emprestimosService: EmprestimosService, 
    private route: ActivatedRoute,
    private router: Router,
    private linhasCreditoService: LinhasCreditoService,
    private parametroBoletoService: ParametroBoletoService) {
    super(store);
  }

  ngOnInit() {
    this.emprestimo.levantamento = new Levantamento();
    this.emprestimo.linhaCredito = new LinhaCredito();
    this.emprestimo.levantamento.pessoa = new Pessoa();
    this.usuarioLogado$ = this.store.pipe(select(selectUsuarioLogado));
    this.usuarioLogado$.subscribe((u: Usuario) => {
      this.usuario = u;
    });

    this.route.queryParams.subscribe(params => {
      this.idEmprestimo = params['idEmprestimo'];
      console.log(params['idEmprestimo']);
      if (this.idEmprestimo) {
          this.emprestimosService.recuperarPorId(this.idEmprestimo).subscribe(
            e => this.preencherDadosEmprestimo(e),
            error => this.addMessageError(error));
      }
    });
  }

  private preencherDadosEmprestimo(e: Emprestimo) {
    this.emprestimo = e;
    console.log(e);
    this.emprestimosService.recuperarParcelas(this.emprestimo.id).subscribe(
      parcelas => this.preencherDadosParcelas(parcelas),
      error => this.addMessageError(error));

    this.parametroBoletoService.recuperar().subscribe(
      param => this.parametroBoleto = param,
      error => this.addMessageError(error));
  }

  private preencherDadosParcelas(parcelas: Array<Parcela>) {
    this.parcelas = parcelas;
  }

  ngOnDestroy() {
  }

  converterMoeda(moeda: number) {
    var moedaFormatada = '';
    if (moeda != null) {
      moedaFormatada = FormatadoresUtil.formatarMoeda(moeda);
    }
    return moedaFormatada;
  }

  carregarBoleto(parcela: Parcela) {
    this.emprestimosService.recuperarBoleto(parcela.id).subscribe(
      b => this.imprimirBoleto(b),
      error => this.addMessageError(error));
  }

  private imprimirBoleto(boleto: Boleto) {
    this.boleto = boleto;
    document.getElementById('btnImprimir').click();
  }

  descricaoSituacao(situacao: number) {
    var descricao = '';
    if (situacao != null) {
      if (situacao == SituacaoParcelaEnum.AGUARDANDO) {
        descricao = 'Aguardando';
      } else if (situacao == SituacaoParcelaEnum.LIQUIDADA) {
          descricao = 'Liquidada';
      } else if (situacao == SituacaoParcelaEnum.ATRASADA) {
          descricao = 'Atrasada';
      }
    }
    return descricao;
  }

}
