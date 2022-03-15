import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { LinhaCredito } from '../../../../models/linha-credito';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { countLinhaCredito, pesquisarLinhaCredito, atualiarStatusLinhaCredito, countLinhaCreditoSucesso } from '../../actions/linhas-credito.action';
import { Observable } from 'rxjs';
import { selectLinhaCreditoCount, selectLinhaCreditoPage, selectLinhaCreditoPageShow } from '../../selectors/linhas-credito.selectors';
import { PaginationLoadLazy, PageQuery } from '../../../../util/pagination';
import { tap } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { BaseComponent } from '../../../base.components';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { LinhasCreditoService } from '../../../../services/linhas-credito.service';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import swal from 'sweetalert';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-linhas-credito',
  templateUrl: './linhas-credito.component.html',
  styleUrls: ['./linhas-credito.component.scss']
})
export class LinhasCreditoComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('linhasCreditoTable', { static: false })
  tableLinhasCredito: Table;

  @ViewChild('modalStatus', { static: false })
  modal: ModalComponent;

  @ViewChild('modalStatusExclusao', { static: false })
  modalExclusao: ModalComponent;

  linhaCredito: LinhaCredito;
  filtro: LinhaCredito;
  status = StatusRegistroEnum;
  pt: Object = languageCalendar

  totalRecords$: Observable<number>;
  linhasCredito$: Observable<Array<LinhaCredito>>;

  constructor(private store: Store<AppState>, private linhasCreditoService: LinhasCreditoService) {
    super(store);
  }

  ngOnInit() {
    this.totalRecords$ = this.store.pipe(select(selectLinhaCreditoCount));
    this.linhasCredito$ = this.store.pipe(select(selectLinhaCreditoPageShow));

    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countLinhaCreditoSucesso({ filter: new LinhaCredito(), count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new LinhaCredito();
    this.pesquisar();
  }

  pesquisar() {
    this.store.dispatch(countLinhaCredito({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tableLinhasCredito);
  }

  loadLinhasCredito(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarLinhaCredito({ page, sort }));
  }

  carregar(linhaCredito: LinhaCredito) {
    this.linhaCredito = linhaCredito;

    this.linhasCreditoService.verificaExistenciaEmprestimo(linhaCredito).subscribe(
      l => this.abrirModal(l),
      error => this.addMessageError(error));
  }

  abrirModal(l: LinhaCredito) {
    if (l && l != null && l.id && l.id != null) {
      this.modal.open();
    } else {
      this.modalExclusao.open();
    }
  }

  salvar() {
    const status = (this.status.ATIVO === this.linhaCredito.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualiarStatusLinhaCredito({ id: this.linhaCredito.id, status }));
    this.fecharModal();
  }

  excluir() {
    this.linhasCreditoService.excluir(this.linhaCredito).subscribe(
      () => this.processarExclusao(),
      error => this.addMessageError(error));
  }

  processarExclusao() {
    this.modalExclusao.close();
    swal({
      text: 'Linha de Crédito excluída com sucesso definitavamente.',
      icon: 'success',
      buttons: ['Fechar', false]
    });
    this.limparFiltro();
  }

  fecharModal = () => {
    this.modal.close();
  }

}
