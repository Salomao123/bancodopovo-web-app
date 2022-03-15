import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { Observable } from 'rxjs';
import { Uf } from '../../../../models/uf';
import { Cidade } from '../../../../models/cidade';
import { selectUfs, selectCidades, selectEnderecoCount, selectEnderecoPageShow } from '../../selectors/endereco.selectors';
import { listarCidadeEndereco, listarUfEndereco, countEndereco, pesquisarEndereco, salvarEndereco, countEnderecoSucesso } from '../../actions/endereco.action';
import { Pessoa } from '../../../../models/pessoa';
import { Endereco } from '../../../../models/endereco';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../../base.components';
import { PaginationLoadLazy } from '../../../../util/pagination';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('enderecoForm', { static: false })
  form: NgForm;

  @ViewChild('enderecosTable', { static: false })
  table: Table;

  status = StatusRegistroEnum;

  ufs$: Observable<Uf[]>;
  cidades$: Observable<Cidade[]>;

  totalRegistros$: Observable<number>;
  registros$: Observable<Endereco[]>;

  pessoa: Pessoa;

  endereco: Endereco;
  ufSelecionada: number;
  cidadeSelecionada: number;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.ufs$ = this.store.pipe(select(selectUfs));
    this.cidades$ = this.store.pipe(select(selectCidades));

    this.totalRegistros$ = this.store.pipe(select(selectEnderecoCount));
    this.registros$ = this.store.pipe(select(selectEnderecoPageShow));
  }

  carregar(pessoa: Pessoa) {
    this.pessoa = pessoa;
    this.limpar();

    this.pesquisar();
    this.modal.open();
    this.store.dispatch(listarUfEndereco());
  }

  limpar() {
    this.endereco = new Endereco();
    this.ufSelecionada = undefined;
    this.cidadeSelecionada = undefined;
  }

  changeUf() {
    this.store.dispatch(listarCidadeEndereco({ idUf: this.ufSelecionada }));
  }

  fechar() {
    this.limpar();
    this.form.resetForm();
    this.modal.close();

    this.store.dispatch(countEnderecoSucesso({ filter: undefined, count: 0, afterCount: () => {} }));
  }

  pesquisar() {
    const filtro = new Endereco();
    filtro.pessoa = new Pessoa();
    filtro.pessoa.id = this.pessoa.id;

    this.store.dispatch(countEndereco({ filter: filtro, afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.table);
  }

  loadRegistros(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarEndereco({ page, sort }));
  }

  salvar() {
    if (this.form.valid) {
      this.endereco.pessoa = new Pessoa();
      this.endereco.pessoa.id = this.pessoa.id;
      this.endereco.pessoa.version = this.pessoa.version;

      this.endereco.cidade = new Cidade();
      this.endereco.cidade.id = this.cidadeSelecionada;

      this.store.dispatch(salvarEndereco({ registro: this.endereco, afterSave: this.limparForm }));
    }
  }

  limparForm = () => {
    this.limpar();
    this.form.resetForm();
  }

}
