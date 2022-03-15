import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { Observable } from 'rxjs';
import { Funcionalidade } from 'src/app/models/funcionalidade';
import { Perfil } from '../../../../models/perfil';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { selectFuncionalidadesAtivas, selectAcoesNaoVinculadas, selectPerfilFuncionalidadeAcaoCount, selectPerfisFuncionalidadesAcoesPageShow } from '../../selectors/perfil-funcionalidades.selectors';
import { recuperarFuncionalidadesAtivas, recuperarAcoesNaoVinculadas, countPerfilFuncionalidadeAcao, pesquisarPerfilFuncionalidadeAcao, salvarPerfilFuncionalidadeAcao, recuperarAcoesNaoVinculadasSucesso, countPerfilFuncionalidadeAcaoSucesso } from '../../actions/perfil-funcionalidades.action';
import { Acao } from '../../../../models/acao';
import { PerfilFuncionalidadeAcao } from '../../../../models/perfil-funcionalidade-acao';
import { FuncionalidadeAcao } from 'src/app/models/funcionalidade-acao';
import { BaseComponent } from '../../../base.components';
import { PaginationLoadLazy } from '../../../../util/pagination';
import { FuncionalidadeAcaoId } from 'src/app/models/funcionalidade-acao.id';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-perfil-funcionalidade',
  templateUrl: './perfil-funcionalidade.component.html',
  styleUrls: ['./perfil-funcionalidade.component.scss']
})
export class PerfilFuncionalidadeComponent extends BaseComponent implements OnInit {

  status = StatusRegistroEnum;

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('perfilFuncionalidadeForm', { static: false })
  form: NgForm;

  @ViewChild('perfisFuncionalidadesTable', { static: false })
  table: Table;

  funcionalidades$: Observable<Array<Funcionalidade>>;
  acoesNaoVinculadas$: Observable<Array<Acao>>;

  idFuncionalidade: number;
  acoesSelecionadas: Array<number>;

  perfil: Perfil;

  totalRecords$: Observable<number>;
  perfisFuncionalidadesAcoes$: Observable<Array<PerfilFuncionalidadeAcao>>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.funcionalidades$ = this.store.pipe(select(selectFuncionalidadesAtivas));
    this.acoesNaoVinculadas$ = this.store.pipe(select(selectAcoesNaoVinculadas));

    this.totalRecords$ = this.store.pipe(select(selectPerfilFuncionalidadeAcaoCount));
    this.perfisFuncionalidadesAcoes$ = this.store.pipe(select(selectPerfisFuncionalidadesAcoesPageShow));
  }

  carregar(perfil: Perfil) {
    this.store.dispatch(recuperarFuncionalidadesAtivas());
    this.perfil = perfil;
    this.idFuncionalidade = undefined;
    this.acoesSelecionadas = [];
    this.pesquisar();
    this.modal.open();
  }

  fechar() {
    this.form.resetForm();
    this.limparAcoes();

    this.modal.close();
    this.store.dispatch(countPerfilFuncionalidadeAcaoSucesso({ filter: undefined, count: 0, afterCount: () => {} }));
  }

  limparAcoes() {
    this.store.dispatch(recuperarAcoesNaoVinculadasSucesso({ acoes: undefined }));
  }

  changeFuncionalidade() {
    if (this.idFuncionalidade) {
      this.store.dispatch(recuperarAcoesNaoVinculadas({ idPerfil: this.perfil.id, idFuncionalidade: this.idFuncionalidade }));
    } else {
      this.limparAcoes();
    }
    this.pesquisar();
  }

  changeAcoes(idAcao: number, isCheked: boolean) {
    if (isCheked) {
      this.acoesSelecionadas.push(idAcao);
    } else {
      const index = this.acoesSelecionadas.indexOf(idAcao);
      this.acoesSelecionadas.splice(index, 1);
    }
  }

  pesquisar() {
    const filtro = new PerfilFuncionalidadeAcao();

    filtro.perfil = new Perfil();
    filtro.perfil.id = this.perfil.id;

    filtro.funcionalidadeAcao = new FuncionalidadeAcao();
    filtro.funcionalidadeAcao.id = new FuncionalidadeAcaoId();
    filtro.funcionalidadeAcao.id.idFuncionalidade = this.idFuncionalidade;

    this.store.dispatch(countPerfilFuncionalidadeAcao({ filter: filtro, afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.table);
  }

  loadPerfis(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarPerfilFuncionalidadeAcao({ page, sort }));
  }

  salvar() {
    const perfilsFuncsAcoes = this.acoesSelecionadas.map(a => {
      const perfilFuncionalidadeAcao = new PerfilFuncionalidadeAcao();
      perfilFuncionalidadeAcao.status = this.status.ATIVO;
      perfilFuncionalidadeAcao.perfil = Object.assign({}, this.perfil);

      perfilFuncionalidadeAcao.funcionalidadeAcao = new FuncionalidadeAcao();
      perfilFuncionalidadeAcao.funcionalidadeAcao.id = new FuncionalidadeAcaoId();
      perfilFuncionalidadeAcao.funcionalidadeAcao.id.idFuncionalidade = this.idFuncionalidade;
      perfilFuncionalidadeAcao.funcionalidadeAcao.id.idAcao = a;

      return perfilFuncionalidadeAcao;
    });

    this.store.dispatch(salvarPerfilFuncionalidadeAcao({ perfis: perfilsFuncsAcoes, afterSave: this.limparAcoesSalvar }));
  }

  limparAcoesSalvar = () => {
    this.acoesSelecionadas = [];
    this.clearTable();
  }

}
