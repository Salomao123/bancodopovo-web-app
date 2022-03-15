import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { Table } from 'primeng/table';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { EmpregadoConsignante } from '../../../../models/empregado-consignante';
import { Pessoa } from '../../../../models/pessoa';
import { Observable } from 'rxjs';
import { selectEmpregadoConsignanteCount, selectEmpregadoConsignantePageShow } from '../../selectors/empregado-consignante.selectors';
import { countEmpregadoConsignanteSucesso, countEmpregadoConsignante, pesquisarEmpregadoConsignante, recuperarPorIdEmpregadoConsignante } from '../../actions/empregado-consignante.actions';
import { PaginationLoadLazy } from '../../../../util/pagination';
import { EmpregadoConsignanteNovoComponent } from '../empregado-consignante-novo/empregado-consignante-novo.component';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-empregado-consignante',
  templateUrl: './empregado-consignante.component.html',
  styleUrls: ['./empregado-consignante.component.scss']
})
export class EmpregadoConsignanteComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('empregadosTable', { static: false })
  tableEmpregados: Table;

  @ViewChild('empregadoConsignanteNovo', { static: false })
  empregadoConsignanteNovo: EmpregadoConsignanteNovoComponent;

  status = StatusRegistroEnum;
  pt: Object = languageCalendar

  filtro: EmpregadoConsignante;
  filtroPessoa: Pessoa;

  totalRecords$: Observable<number>;
  registros$: Observable<EmpregadoConsignante[]>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.totalRecords$ = this.store.pipe(select(selectEmpregadoConsignanteCount));
    this.registros$ = this.store.pipe(select(selectEmpregadoConsignantePageShow));

    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countEmpregadoConsignanteSucesso({ filter: undefined, count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new EmpregadoConsignante();
    this.filtroPessoa = new Pessoa();

    this.pesquisar();
  }

  pesquisar() {
    this.filtro.pessoa = Object.assign({}, this.filtroPessoa);
    this.store.dispatch(countEmpregadoConsignante({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tableEmpregados);
  }

  loadRegistros(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarEmpregadoConsignante({ page, sort }));
  }

  editarRegistro(id: number) {
    this.store.dispatch(recuperarPorIdEmpregadoConsignante({ id, afterConsulta: this.carregarEdicao }));
  }

  carregarEdicao = (empregadoConsingnate: EmpregadoConsignante) => {
    this.empregadoConsignanteNovo.editar(empregadoConsingnate);
  }
}
