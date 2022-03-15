import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Visita } from '../../../../models/visita';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { countVisita, pesquisarVisita, atualiarStatusVisita, countVisitaSucesso } from '../../actions/visitas.action';
import { Observable } from 'rxjs';
import { selectVisitaCount, selectVisitasPage, selectVisitasPageShow } from '../../selectors/visitas.selectors';
import { PaginationLoadLazy, PageQuery } from '../../../../util/pagination';
import { tap } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { BaseComponent } from '../../../base.components';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('visitasTable', { static: false })
  tableVisitas: Table;

  filtro: Visita;
  status = StatusRegistroEnum;
  pt: Object = languageCalendar

  totalRecords$: Observable<number>;
  visitas$: Observable<Array<Visita>>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.totalRecords$ = this.store.pipe(select(selectVisitaCount));
    this.visitas$ = this.store.pipe(select(selectVisitasPageShow));

    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countVisitaSucesso({ filter: new Visita(), count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new Visita();
    this.pesquisar();
  }

  pesquisar() {
    this.store.dispatch(countVisita({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tableVisitas);
  }

  loadVisitas(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarVisita({ page, sort }));
  }

}
