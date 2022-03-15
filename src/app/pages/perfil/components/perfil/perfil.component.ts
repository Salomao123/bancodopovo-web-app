import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Table } from 'primeng/table';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Perfil } from '../../../../models/perfil';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { BaseComponent } from '../../../base.components';
import { selectPerfilCount, selectPerfisPageShow } from '../../selectors/perfil.selectors';
import { countPerfil, pesquisarPerfil, countPerfilSucesso } from '../../actions/perfil.actions';
import { PaginationLoadLazy } from '../../../../util/pagination';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('perfisTable', { static: false })
  tablePerfis: Table;

  status = StatusRegistroEnum;
  pt: Object = languageCalendar

  filtro: Perfil;

  totalRecords$: Observable<number>;
  perfis$: Observable<Array<Perfil>>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.totalRecords$ = this.store.pipe(select(selectPerfilCount));
    this.perfis$ = this.store.pipe(select(selectPerfisPageShow));

    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countPerfilSucesso({ filter: undefined, count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new Perfil();
    this.pesquisar();
  }

  pesquisar() {
    this.store.dispatch(countPerfil({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tablePerfis);
  }

  loadPerfis(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarPerfil({ page, sort }));
  }

}
