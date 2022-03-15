import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Table } from 'primeng/table';
import { Empresa } from '../../../../models/empresa';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { countEmpresaSucesso, countEmpresa, pesquisarEmpresa } from '../../actions/empresa.actions';
import { selectEmpresaCount, selectEmpresasPage, selectEmpresasPageShow } from '../../selectors/empresa.selectors';
import { PaginationLoadLazy } from '../../../../util/pagination';
import { BaseComponent } from '../../../base.components';
import { tap } from 'rxjs/operators';
import { Pessoa } from 'src/app/models/pessoa';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('empresasTable', { static: false })
  tableEmpresa: Table;

  status = StatusRegistroEnum;

  filtro: Empresa;
  filtroPessoa: Pessoa;
  pt: Object = languageCalendar

  totalRecords$: Observable<number>;
  empresas$: Observable<Array<Empresa>>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.totalRecords$ = this.store.pipe(select(selectEmpresaCount));
    this.empresas$ = this.store.pipe(select(selectEmpresasPageShow));
    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countEmpresaSucesso({ filter: undefined, count: undefined, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new Empresa();
    this.filtroPessoa = new Pessoa();

    this.pesquisar();
  }

  pesquisar() {
    this.filtro.pessoa = Object.assign({}, this.filtroPessoa);
    this.store.dispatch(countEmpresa({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tableEmpresa);
  }

  loadEmpresas(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarEmpresa({ page, sort }));
  }

}
