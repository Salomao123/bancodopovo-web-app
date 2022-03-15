import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Emprestimo } from '../../../../models/emprestimo';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { LinhasCreditoService } from '../../../../services/linhas-credito.service';
import { LinhaCredito } from '../../../../models/linha-credito';
import { countEmprestimo, pesquisarEmprestimo, atualiarStatusEmprestimo, countEmprestimoSucesso } from '../../actions/emprestimos.action';
import { Observable } from 'rxjs';
import { selectEmprestimoCount, selectEmprestimosPage, selectEmprestimosPageShow } from '../../selectors/emprestimos.selectors';
import { PaginationLoadLazy, PageQuery } from '../../../../util/pagination';
import { tap } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { BaseComponent } from '../../../base.components';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.component.html',
  styleUrls: ['./emprestimos.component.scss']
})
export class EmprestimosComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('emprestimosTable', { static: false })
  tableEmprestimos: Table;

  filtro: Emprestimo;
  status = StatusRegistroEnum;
  pt: Object = languageCalendar

  totalRecords$: Observable<number>;
  emprestimos$: Observable<Array<Emprestimo>>;

  linhasCredito: Array<LinhaCredito>;

  constructor(private store: Store<AppState>,
    private linhasCreditoService: LinhasCreditoService, 
    private router: Router) {
    super(store);
  }

  ngOnInit() {

    this.linhasCreditoService.recuperarLinhasAtivas(null).subscribe(
      l => this.linhasCredito = l/*,
      error => this.addMessageError(error)*/);

    this.totalRecords$ = this.store.pipe(select(selectEmprestimoCount));
    this.emprestimos$ = this.store.pipe(select(selectEmprestimosPageShow));

    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countEmprestimoSucesso({ filter: new Emprestimo(), count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new Emprestimo();
    this.pesquisar();
  }

  pesquisar() {
    this.store.dispatch(countEmprestimo({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  detalhar(e: Emprestimo) {
    this.router.navigate(['/pages/emprestimo-detalhe'], { queryParams: { idEmprestimo: e.id, tipo: 'detalheEmprestimo' } });
  }

  clearTable = () => {
    super.resetTable(this.tableEmprestimos);
  }

  loadEmprestimos(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarEmprestimo({ page, sort }));
  }

}
