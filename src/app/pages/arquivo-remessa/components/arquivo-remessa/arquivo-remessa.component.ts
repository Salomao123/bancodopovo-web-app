import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Table } from 'primeng/table';
import { SituacaoArquivoRemessaEnum } from '../../../../enums/situacao.arquivo.remessa';
import { ArquivoRemessa } from '../../../../models/arquivo-remessa';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { BaseComponent } from '../../../base.components';
import { selectArquivoRemessaCount, selectArquivoRemessaPageShow } from '../../selectors/arquivo-remessa.selectors';
import { countArquivoRemessaSucesso, countArquivoRemessa, pesquisarArquivoRemessa, gerarArquivoRemessa } from '../../actions/arquivo-remessa.actions';
import { PaginationLoadLazy } from '../../../../util/pagination';
import { TipoArquivoRemessaEnum } from '../../../../enums/tipo.arquivo.remessa';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-arquivo-remessa',
  templateUrl: './arquivo-remessa.component.html',
  styleUrls: ['./arquivo-remessa.component.scss']
})
export class ArquivoRemessaComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('arquivosTable', { static: false })
  tableArquivos: Table;

  situacao = SituacaoArquivoRemessaEnum;
  tipo = TipoArquivoRemessaEnum;

  filtro: ArquivoRemessa;

  pt: Object = languageCalendar;

  totalRecords$: Observable<number>;
  records$: Observable<Array<ArquivoRemessa>>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.totalRecords$ = this.store.pipe(select(selectArquivoRemessaCount));
    this.records$ = this.store.pipe(select(selectArquivoRemessaPageShow));
    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countArquivoRemessaSucesso({ filter: undefined, count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new ArquivoRemessa();
    this.pesquisar();
  }

  pesquisar() {
    this.store.dispatch(countArquivoRemessa({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tableArquivos);
  }

  loadRecords(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarArquivoRemessa({ page, sort }));
  }

  gerarRemessa() {
    this.store.dispatch(gerarArquivoRemessa({ afterDownload: this.downloadRemessa }));
  }

  downloadRemessa = (arquivo: any, nome: string) => {
    const blob = new Blob([arquivo], { type: 'application/zip' });

    const a: any = document.createElement('a');
    document.body.appendChild(a);

    a.style = 'display: none';
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = nome + 'zip';
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
