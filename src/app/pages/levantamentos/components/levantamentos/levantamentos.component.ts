import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Levantamento } from '../../../../models/levantamento';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { LevantamentosService } from '../../../../services/levantamentos.service';
import { countLevantamento, pesquisarLevantamento, atualiarStatusLevantamento, countLevantamentoSucesso } from '../../actions/levantamentos.action';
import { Observable } from 'rxjs';
import { selectLevantamentoCount, selectLevantamentosPage, selectLevantamentosPageShow } from '../../selectors/levantamentos.selectors';
import { PaginationLoadLazy, PageQuery } from '../../../../util/pagination';
import { tap } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { BaseComponent } from '../../../base.components';
import { StatusLevantamentoEnum } from '../../../../enums/status.levantamento';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import swal from 'sweetalert';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-levantamentos',
  templateUrl: './levantamentos.component.html',
  styleUrls: ['./levantamentos.component.scss']
})
export class LevantamentosComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('levantamentosTable', { static: false })
  tableLevantamentos: Table;

  @ViewChild('modal', {static: false})
  modal: ModalComponent;

  filtro: Levantamento;
  status = StatusLevantamentoEnum;
  pt: Object = languageCalendar

  totalRecords$: Observable<number>;
  levantamentos$: Observable<Array<Levantamento>>;

  levantamentoCancelar: Levantamento;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router,
    private levantamentosService: LevantamentosService) {
    super(store);
  }

  ngOnInit() {
    this.totalRecords$ = this.store.pipe(select(selectLevantamentoCount));
    this.levantamentos$ = this.store.pipe(select(selectLevantamentosPageShow));

    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countLevantamentoSucesso({ filter: new Levantamento(), count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new Levantamento();
    this.pesquisar();
  }

  pesquisar() {
    this.store.dispatch(countLevantamento({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tableLevantamentos);
  }

  loadLevantamentos(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarLevantamento({ page, sort }));
  }

  carregarLevantamento(levantamento: Levantamento) {
    this.router.navigate(['/pages/levantamento-novo'], { queryParams: { idLevantamento: levantamento.id, tipo: 'detalhe' } });
  }

  carregarImpressao(levantamento: Levantamento) {
    this.router.navigate(['/pages/levantamento-novo'], { queryParams: { idLevantamento: levantamento.id, tipo: 'impressao' } });
  }

  carregarEmprestimo(levantamento: Levantamento) {
    this.router.navigate(['/pages/levantamento-novo'], { queryParams: { idLevantamento: levantamento.id, tipo: 'detalheEmprestimo' } });
  }

  gerarEmprestimo(levantamento: Levantamento) {
    this.router.navigate(['/pages/levantamento-novo'], { queryParams: { idLevantamento: levantamento.id, tipo: 'gerarEmprestimo' } });
  }

  gerarRascunho(levantamento: Levantamento) {
    this.router.navigate(['/pages/levantamento-novo'], { queryParams: { idLevantamento: levantamento.id, tipo: 'gerarRascunho' } });
  }

  carregarLevantamentoCancelar(levantamento: Levantamento) {
    this.levantamentoCancelar = Object.assign({}, levantamento);
    this.modal.open();
  }

  cancelarLevantamento() {
    if (this.levantamentoCancelar) {
      this.levantamentoCancelar.status = StatusLevantamentoEnum.CANCELADO;
      this.levantamentosService.salvar(this.levantamentoCancelar).subscribe(
        l => this.processarLevantamentoCancelar(l),
        error => this.addMessageError(error));
    }
  }

  private processarLevantamentoCancelar(l: Levantamento) {
    this.modal.close();
    swal({
      text: 'Rascunho de Levantamento Socioeconômico cancelado com sucesso.',
      icon: 'success',
      buttons: ['Fechar', false]
    });
    this.pesquisar();
  }

}
