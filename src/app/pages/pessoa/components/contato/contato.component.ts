import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { NgForm } from '@angular/forms';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Observable } from 'rxjs';
import { Contato } from '../../../../models/contato';
import { Pessoa } from '../../../../models/pessoa';
import { TipoContatoEnum } from '../../../../enums/tipo.contato';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectContatoCount, selectContatoPageShow } from '../../selectors/contato.selectors';
import { countContato, pesquisarContato, salvarContato, countContatoSucesso } from '../../actions/contato.action';
import { PaginationLoadLazy } from '../../../../util/pagination';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('contatoForm', { static: false })
  form: NgForm;

  @ViewChild('contatosTable', { static: false })
  table: Table;

  status = StatusRegistroEnum;
  tipoContato = TipoContatoEnum;

  totalRegistros$: Observable<number>;
  registros$: Observable<Contato[]>;

  contato: Contato;
  pessoa: Pessoa;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.totalRegistros$ = this.store.pipe(select(selectContatoCount));
    this.registros$ = this.store.pipe(select(selectContatoPageShow));
  }

  carregar(pessoa: Pessoa) {
    this.limpar();
    this.pessoa = pessoa;

    this.pesquisar();
    this.modal.open();
  }

  limpar() {
    this.contato = new Contato();
    this.contato.tipo = undefined;
  }

  fechar() {
    this.limpar();
    this.form.resetForm();
    this.modal.close();

    this.store.dispatch(countContatoSucesso({ filter: undefined, count: 0, afterCount: () => {} }));
  }

  pesquisar() {
    const filtro = new Contato();
    filtro.pessoa = new Pessoa();
    filtro.pessoa.id = this.pessoa.id;

    this.store.dispatch(countContato({ filter: filtro, afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.table);
  }

  loadRegistros(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarContato({ page, sort }));
  }

  salvar() {
    if (this.form.valid) {
      this.contato.pessoa = new Pessoa();
      this.contato.pessoa.id = this.pessoa.id;
      this.contato.pessoa.version = this.pessoa.version;

      this.store.dispatch(salvarContato({ registro: this.contato, afterSave: this.limparForm }));
    }
  }

  limparForm = () => {
    this.limpar();
    this.form.resetForm();
  }

}
