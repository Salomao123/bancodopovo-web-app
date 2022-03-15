import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { Proposta } from '../../../../models/proposta';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { BaseComponent } from '../../../base.components';
import { selectConsignacaoCount, selectConsignacaoPageShow, selectConsignadosConsignacao } from '../../selectors/consignacao.selectors';
import { countConsignacaoSucesso, countConsignacao, pesquisarConsignacao, detalharPropostaConsignacao, recuperarConsignadosPropostaConsignacao } from '../../actions/consignacao.actions';
import { EmpregadoConsignante } from 'src/app/models/empregado-consignante';
import { Pessoa } from 'src/app/models/pessoa';
import { NgForm } from '@angular/forms';
import { PaginationLoadLazy } from '../../../../util/pagination';
import { SituacaoPropostaEnum } from '../../../../enums/situacao.proposta';
import { ConsignacaoDetalheComponent } from '../consignacao-detalhe/consignacao-detalhe.component';
import { ConsignacaoEncerramentoComponent } from '../consignacao-encerramento/consignacao-encerramento.component';
import { ConsignacaoRenovacaoComponent } from '../consignacao-renovacao/consignacao-renovacao.component';
import { ConsignacaoSuspensaoComponent } from '../consignacao-suspensao/consignacao-suspensao.component';
import { ConsignacaoSuspensaoCancelamentoComponent } from '../consignacao-suspensao-cancelamento/consignacao-suspensao-cancelamento.component';

@Component({
  selector: 'app-consignacao',
  templateUrl: './consignacao.component.html',
  styleUrls: ['./consignacao.component.scss']
})
export class ConsignacaoComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('consignacoesTable', { static: false })
  consignacoesTable: Table;

  @ViewChild('consignacaoDetalhe', { static: false })
  consignacaoDetalhe: ConsignacaoDetalheComponent;

  @ViewChild('consignacaoEncerramento', { static: false })
  consignacaoEncerramento: ConsignacaoEncerramentoComponent;

  @ViewChild('consignacaoRenovacao', { static: false })
  consignacaoRenovacao: ConsignacaoRenovacaoComponent;

  @ViewChild('consignacaoSuspensao', { static: false })
  consignacaoSuspensao: ConsignacaoSuspensaoComponent;

  @ViewChild('consignacaoCancelamentoSuspensao', { static: false })
  consignacaoCancelamentoSuspensao: ConsignacaoSuspensaoCancelamentoComponent;

  situacao = SituacaoPropostaEnum;

  cpf: string;
  consignado: EmpregadoConsignante;

  renovacao: boolean;
  propostasSelecionadasRenovacao: Proposta[];

  consignados$: Observable<EmpregadoConsignante[]>;
  totalRegistros$: Observable<number>;
  registros$: Observable<Proposta[]>;

  constructor(private store: Store<AppState>) {
    super(store);
    this.renovacao = false;
  }

  ngOnInit() {
    this.consignados$ = this.store.pipe(select(selectConsignadosConsignacao));
    this.totalRegistros$ = this.store.pipe(select(selectConsignacaoCount));
    this.registros$ = this.store.pipe(select(selectConsignacaoPageShow));
  }

  ngOnDestroy() {
    this.store.dispatch(countConsignacaoSucesso({ filter: undefined, count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.cpf = undefined;
  }

  pesquisar(form: NgForm) {

    if (form.valid) {
      this.renovacao = false;
      // this.realizarPesquisa(null);
      this.store.dispatch(recuperarConsignadosPropostaConsignacao({ filter: this.montarFiltro(), afterConsulta: this.realizarPesquisa }));
    }
  }

  montarFiltro(): Proposta {
    const proposta = new Proposta();
    proposta.empregadoConsignante = new EmpregadoConsignante();
    proposta.empregadoConsignante.pessoa = new Pessoa();
    proposta.empregadoConsignante.pessoa.documento = this.cpf;

    if (this.renovacao) {
      proposta.situacao = SituacaoPropostaEnum.ATIVA;
    }

    if (this.consignado) {
      proposta.empregadoConsignante.matricula = this.consignado.matricula;
    }

    return proposta;
  }

  realizarPesquisa = (consignado: EmpregadoConsignante) => {
    this.consignado = consignado;
    const proposta = this.montarFiltro();

    this.store.dispatch(countConsignacao({ filter: proposta, afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.consignacoesTable);
  }

  loadRegistros(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarConsignacao({ page, sort }));
  }

  changeRenovacao(isChecked: boolean) {
    this.renovacao = isChecked;
    this.propostasSelecionadasRenovacao = [];

    this.realizarPesquisa(this.consignado);
  }

  detalhar(id: number) {
    this.store.dispatch(detalharPropostaConsignacao({ id, afterDetalhar: this.abrirDetalhamento }));
  }

  abrirDetalhamento = () => {
    this.consignacaoDetalhe.carregar();
  }

  encerrar(id: number) {
    this.store.dispatch(detalharPropostaConsignacao({ id, afterDetalhar: this.abrirEncerramento }));
  }

  abrirEncerramento = () => {
    this.consignacaoEncerramento.carregar();
  }

  renovar() {
    if (!this.propostasSelecionadasRenovacao || this.propostasSelecionadasRenovacao.length === 0) {
      super.addMessageError({ error: { message: 'Ao menos uma proposta vigente deve ser selecionada.'}});
    } else {

      this.consignacaoRenovacao.carregar(this.propostasSelecionadasRenovacao, this.consignado);
    }
  }

  suspender(id: number) {
    this.store.dispatch(detalharPropostaConsignacao({ id, afterDetalhar: this.abrirSuspensao }));
  }

  abrirSuspensao = () => {
    this.consignacaoSuspensao.carregar();
  }

  cancelarSuspensao(id: number) {
    this.store.dispatch(detalharPropostaConsignacao({ id, afterDetalhar: this.abrirCancelamentoSuspensao }));
  }

  abrirCancelamentoSuspensao = () => {
    this.consignacaoCancelamentoSuspensao.carregar();
  }

}
