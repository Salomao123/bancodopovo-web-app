import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../../../../models/evento';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { countEvento, pesquisarEvento, atualiarStatusEvento, countEventoSucesso } from '../../actions/eventos.action';
import { Observable } from 'rxjs';
import { selectEventoCount, selectEventosPage, selectEventosPageShow } from '../../selectors/eventos.selectors';
import { PaginationLoadLazy, PageQuery } from '../../../../util/pagination';
import { tap } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { BaseComponent } from '../../../base.components';
import { StatusEventoEnum } from '../../../../enums/status.evento';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('eventosTable', { static: false })
  tableEventos: Table;

  filtro: Evento;
  status = StatusEventoEnum;
  pt: Object = languageCalendar

  totalRecords$: Observable<number>;
  eventos$: Observable<Array<Evento>>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
    super(store);
  }

  ngOnInit() {
    this.totalRecords$ = this.store.pipe(select(selectEventoCount));
    this.eventos$ = this.store.pipe(select(selectEventosPageShow));

    this.limparFiltro();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.store.dispatch(countEventoSucesso({ filter: new Evento(), count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new Evento();
    this.pesquisar();
  }

  pesquisar() {
    this.store.dispatch(countEvento({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tableEventos);
  }

  loadEventos(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarEvento({ page, sort }));
  }

  carregarParticipantes(evento: Evento) {
    this.router.navigate(['/pages/eventos-participantes'], { queryParams: { idEvento: evento.id } });
  }

}
