import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { BaseComponent } from '../../../base.components';
import { Observable } from 'rxjs';
import { ConsignadoPropostasVo } from '../../../../vo/consignado-propostas.vo';
import { selectConsignadosConsignacaoExtrato, selectPropostasConsignacaoExtrato } from '../../selectors/consignacao-extrato.selectors';
import { Proposta } from '../../../../models/proposta';
import { SituacaoPropostaEnum } from '../../../../enums/situacao.proposta';
import { recuperarVinculosConsignacaoExtrato, recuperarPropostasConsignacaoExtrato, recuperarParcelasPropostasConsignacaoExtrato } from '../../actions/consignacao-extrato.actions';
import { Table } from 'primeng/table';
import { ExtratoParcelasComponent } from '../extrato-parcelas/extrato-parcelas.component';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent extends BaseComponent implements OnInit {

  @ViewChild('consignacoesTable', { static: false })
  table: Table;

  @ViewChild('extratoParcelas', { static: false })
  extratoParcelas: ExtratoParcelasComponent;

  situacao = SituacaoPropostaEnum;

  consignados$: Observable<ConsignadoPropostasVo[]>;
  propostas$: Observable<Proposta[]>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.consignados$ = this.store.pipe(select(selectConsignadosConsignacaoExtrato));
    this.propostas$ = this.store.pipe(select(selectPropostasConsignacaoExtrato));

    this.store.dispatch(recuperarVinculosConsignacaoExtrato());
  }

  cloearTable = () => {
    super.resetTable(this.table);
  }

  realizarPesquisa(consignado: ConsignadoPropostasVo) {
    this.store.dispatch(recuperarPropostasConsignacaoExtrato({ consignadoSelecionado: consignado.consignado.id, after: this.cloearTable }));
  }

  detalhar(proposta: Proposta) {
    this.store.dispatch(recuperarParcelasPropostasConsignacaoExtrato({ idProposta: proposta.id, after: this.abrirDetalhamento }));
  }

  abrirDetalhamento = () => {
    this.extratoParcelas.carregar();
  }

}
