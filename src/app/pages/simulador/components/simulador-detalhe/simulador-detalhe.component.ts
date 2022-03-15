import { Component, OnInit, ViewChild } from '@angular/core';
import { SimulacaoVo } from '../../../../vo/simulacao.vo';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectSimulacaoSelecionadoSimulador } from '../../selectors/simulador.selectors';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { BaseComponent } from '../../../base.components';

@Component({
  selector: 'app-simulador-detalhe',
  templateUrl: './simulador-detalhe.component.html',
  styleUrls: ['./simulador-detalhe.component.scss']
})
export class SimuladorDetalheComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('simulacoesTable', { static: false })
  table: Table;

  simulacaoVo$: Observable<SimulacaoVo>;
  valorEmprestimo: number;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.simulacaoVo$ = this.store.pipe(select(selectSimulacaoSelecionadoSimulador));
  }

  carregar() {
    super.resetTable(this.table);
    this.modal.open();
  }

  fechar() {
    this.valorEmprestimo = undefined;
    this.modal.close();
  }

}
