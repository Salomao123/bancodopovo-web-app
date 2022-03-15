import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Table } from 'primeng/table';
import { SituacaoVisualizacaoMargemEnum } from '../../../../enums/situacao.visualizacao.margem';
import { VisualizacaoMargem } from 'src/app/models/visualizacao-margem';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectVisualizacaoMargemCount, selectVisualizacaoMargemPageShow } from '../../selectors/visualizacao-margem.selectors';
import { countVisualizacaoMargem, pesquisarVisualizacaoMargem, countVisualizacaoMargemSucesso } from '../../actions/visualizacao-margem.actions';
import { BaseComponent } from '../../../base.components';
import { PaginationLoadLazy } from '../../../../util/pagination';

@Component({
  selector: 'app-visualizacao-margem',
  templateUrl: './visualizacao-margem.component.html',
  styleUrls: ['./visualizacao-margem.component.scss']
})
export class VisualizacaoMargemComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('margensTable', { static: false })
  tableMargens: Table;

  situacao = SituacaoVisualizacaoMargemEnum;
  filtro: VisualizacaoMargem;

  totalRegistros$: Observable<number>;
  registros$: Observable<VisualizacaoMargem[]>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.totalRegistros$ = this.store.pipe(select(selectVisualizacaoMargemCount));
    this.registros$ = this.store.pipe(select(selectVisualizacaoMargemPageShow));

    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countVisualizacaoMargemSucesso({ filter: undefined, count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new VisualizacaoMargem();
    this.filtro.situacao = SituacaoVisualizacaoMargemEnum.SOLICITADO;

    this.pesquisar();
  }

  pesquisar() {
    this.store.dispatch(countVisualizacaoMargem({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tableMargens);
  }

  loadRegistros(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarVisualizacaoMargem({ page, sort }));
  }
}
