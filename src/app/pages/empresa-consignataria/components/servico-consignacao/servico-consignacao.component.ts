import { ServicoConsignacao } from './../../../../models/servico-consignacao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { NgForm } from '@angular/forms';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Observable } from 'rxjs';
import { EmpresaConsignataria } from '../../../../models/empresa-consignataria';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectServicoConsignacaoCount, selectServicoConsignacaoPageShow } from '../../selectors/servico-consignacao.selectors';
import { countServicoConsignacao, pesquisarServicoConsignacao, salvarServicoConsignacao, countServicoConsignacaoSucesso } from '../../actions/servico-consignacao.actions';
import { PaginationLoadLazy } from '../../../../util/pagination';

@Component({
  selector: 'app-servico-consignacao',
  templateUrl: './servico-consignacao.component.html',
  styleUrls: ['./servico-consignacao.component.scss']
})
export class ServicoConsignacaoComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('servicoConsignacaoForm', { static: false })
  form: NgForm;

  status = StatusRegistroEnum;

  totalRegistros$: Observable<number>;
  registros$: Observable<ServicoConsignacao[]>;

  servicoConsignacao: ServicoConsignacao;
  empresaConsignataria: EmpresaConsignataria;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.totalRegistros$ = this.store.pipe(select(selectServicoConsignacaoCount));
    this.registros$ = this.store.pipe(select(selectServicoConsignacaoPageShow));
  }

  carregar(empresaConsignataria: EmpresaConsignataria) {
    this.empresaConsignataria = empresaConsignataria;
    this.limparServicoConsignacao();

    this.pesquisar();
    this.modal.open();
  }

  editar(servicoConsignacao: ServicoConsignacao) {
    this.servicoConsignacao = Object.assign({}, servicoConsignacao);
  }

  limparServicoConsignacao() {
    this.servicoConsignacao = new ServicoConsignacao();
  }

  pesquisar() {
    const filtro = new ServicoConsignacao();
    filtro.empresaConsignataria = new EmpresaConsignataria();
    filtro.empresaConsignataria.id = this.empresaConsignataria.id;

    this.store.dispatch(countServicoConsignacao({ filter: filtro, afterCount: () => {} }));
  }

  loadRegistros(event: PaginationLoadLazy) {
    const page = this.pageQuery(event);
    const sort = this.sortQuery(event);

    this.store.dispatch(pesquisarServicoConsignacao({ page, sort }));
  }

  salvar() {
    if (this.form.valid) {
      this.servicoConsignacao.empresaConsignataria = new EmpresaConsignataria();
      this.servicoConsignacao.empresaConsignataria.id = this.empresaConsignataria.id;
      this.servicoConsignacao.empresaConsignataria.version = this.empresaConsignataria.version;

      this.store.dispatch(salvarServicoConsignacao({ registro: this.servicoConsignacao, afterSave: this.limparForm }));
    }
  }

  limparForm = () => {
    this.limparServicoConsignacao();
    this.form.resetForm();
  }

  fechar() {
    this.limparServicoConsignacao();
    this.form.resetForm();
    this.modal.close();

    this.store.dispatch(countServicoConsignacaoSucesso({ filter: undefined, count: 0, afterCount: () => {} }));
  }

}
