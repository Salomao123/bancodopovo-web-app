import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Observable } from 'rxjs';
import { Pessoa } from '../../../../models/pessoa';
import { Representante } from '../../../../models/representante';
import { EmpresaConsignataria } from '../../../../models/empresa-consignataria';
import { selectPessoasFisicas, selectRepresentanteCount, selectRepresentantePageShow } from '../../selectors/representante.selectors';
import { consultarPessoasFisicasRep, countRepresentante, pesquisarRepresentante, carreagarDependenciasRepresentante, countRepresentanteSucesso } from '../../actions/representante.actions';
import { PaginationLoadLazy } from '../../../../util/pagination';
import { TipoContatoEnum } from 'src/app/enums/tipo.contato';

@Component({
  selector: 'app-representante',
  templateUrl: './representante.component.html',
  styleUrls: ['./representante.component.scss']
})
export class RepresentanteComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('representanteForm', { static: false })
  form: NgForm;

  status = StatusRegistroEnum;

  pessoasFisicas$: Observable<Pessoa[]>;
  totalRegistros$: Observable<number>;
  registros$: Observable<Representante[]>;

  representante: Representante;
  empresaConsignataria: EmpresaConsignataria;
  idPessoaSelecionada: number;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.pessoasFisicas$ = this.store.pipe(select(selectPessoasFisicas));
    this.totalRegistros$ = this.store.pipe(select(selectRepresentanteCount));
    this.registros$ = this.store.pipe(select(selectRepresentantePageShow));
  }

  carregar(empresaConsignataria: EmpresaConsignataria) {
    this.store.dispatch(consultarPessoasFisicasRep());

    this.limparRepresentante();
    this.empresaConsignataria = empresaConsignataria;

    this.pesquisar();
    this.modal.open();
  }

  limparRepresentante() {
    this.representante = new Representante();
    this.idPessoaSelecionada = undefined;
  }

  fechar() {
    this.limparRepresentante();
    this.modal.close();

    this.store.dispatch(countRepresentanteSucesso({ filter: undefined, count: 0, afterCount: () => {} }));
  }

  pesquisar() {
    const filtro = new Representante();
    filtro.empresaConsignataria = new EmpresaConsignataria();
    filtro.empresaConsignataria.id = this.empresaConsignataria.id;

    this.store.dispatch(countRepresentante({ filter: filtro, afterCount: () => {} }));
  }

  loadRegistros(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarRepresentante({ page, sort }));
  }

  montarContatoEmail(representante: Representante) {
    const emails = this.montarContatos(representante, TipoContatoEnum.EMAIL);
    if ((emails) && emails.length > 0) {
      return emails.map(e => e.email);
    }
  }

  montarContatoTelefone(representante: Representante) {
    const telefones = this.montarContatos(representante, TipoContatoEnum.TELEFONE);
    if ((telefones) && telefones.length > 0) {
      return telefones.map(t => t.telefone);
    }
  }

  montarContatos(representante: Representante, tipo: TipoContatoEnum) {
    if ((representante.contatos) && representante.contatos.length > 0) {
      return representante.contatos.filter(c => c.tipo === tipo);
    }
  }

  salvar() {
    if (this.form.valid) {
      this.representante.empresaConsignataria = new EmpresaConsignataria();
      this.representante.empresaConsignataria.id = this.empresaConsignataria.id;
      this.representante.empresaConsignataria.version = this.empresaConsignataria.version;

      this.representante.pessoa = new Pessoa();
      this.representante.pessoa.id = this.idPessoaSelecionada;

      this.store.dispatch(carreagarDependenciasRepresentante({ registro: this.representante, afterSave: this.limparForm }));
    }
  }

  limparForm = () => {
    this.limparRepresentante();
    this.form.resetForm();
  }

}
