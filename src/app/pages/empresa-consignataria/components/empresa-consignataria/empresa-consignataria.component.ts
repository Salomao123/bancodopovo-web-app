import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { EmpresaConsignataria } from '../../../../models/empresa-consignataria';
import { Pessoa } from '../../../../models/pessoa';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { countEmpresaConsignatariaSucesso, countEmpresaConsignataria, pesquisarEmpresaConsignataria } from '../../actions/empresa-consignataria.actions';
import { selectEmpresaConsignatariaCount, selectEmpresaConsignatariaPageShow } from '../../selectors/empresa-consignataria.selectors';
import { PaginationLoadLazy } from '../../../../util/pagination';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-empresa-consignataria',
  templateUrl: './empresa-consignataria.component.html',
  styleUrls: ['./empresa-consignataria.component.scss']
})
export class EmpresaConsignatariaComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('empresasTable', { static: false })
  tableEmpresas: Table;

  status = StatusRegistroEnum;

  filtro: EmpresaConsignataria;
  filtroPessoa: Pessoa;
  pt: Object = languageCalendar

  totalRegistros$: Observable<number>;
  registros$: Observable<Array<EmpresaConsignataria>>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.totalRegistros$ = this.store.pipe(select(selectEmpresaConsignatariaCount));
    this.registros$ = this.store.pipe(select(selectEmpresaConsignatariaPageShow));

    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countEmpresaConsignatariaSucesso({ filter: undefined, count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new EmpresaConsignataria();
    this.filtroPessoa = new Pessoa();

    this.pesquisar();
  }

  pesquisar() {
    this.filtro.pessoa = Object.assign({}, this.filtroPessoa);
    this.store.dispatch(countEmpresaConsignataria({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tableEmpresas);
  }

  loadRegistros(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarEmpresaConsignataria({ page, sort }));
  }

}
