import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Pessoa } from '../../../../models/pessoa';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { countPessoa, pesquisarPessoa, atualiarStatusPessoa, countPessoaSucesso } from '../../actions/pessoa.action';
import { Observable } from 'rxjs';
import { selectPessoaCount, selectPessoasPage, selectPessoasPageShow } from '../../selectors/pessoa.selectots';
import { PaginationLoadLazy, PageQuery } from '../../../../util/pagination';
import { tap } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { TipoPessoaEnum } from '../../../../enums/tipo.pessoa';
import { BaseComponent } from '../../../base.components';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('pessoasTable', { static: false })
  tablePessoas: Table;

  status = StatusRegistroEnum;
  tipo = TipoPessoaEnum;
  pt: Object = languageCalendar

  filtro: Pessoa;

  totalRecords$: Observable<number>;
  pessoas$: Observable<Array<Pessoa>>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
    super(store);
  }

  ngOnInit() {
    this.totalRecords$ = this.store.pipe(select(selectPessoaCount));
    this.pessoas$ = this.store.pipe(select(selectPessoasPageShow));

    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countPessoaSucesso({ filter: new Pessoa(), count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new Pessoa();
    this.pesquisar();
  }

  pesquisar() {
    this.store.dispatch(countPessoa({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tablePessoas);
  }

  loadPessoas(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarPessoa({ page, sort }));
  }
  
  carregarDocumento(pessoa: Pessoa) {
    this.router.navigate(['/pages/pessoa-documento'], { queryParams: { idPessoa: pessoa.id } });
  }

}
