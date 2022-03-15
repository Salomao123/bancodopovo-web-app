import { Table } from 'primeng/table';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { NgForm } from '@angular/forms';
import { SituacaoConvenioEnum } from '../../../../enums/situacao.convenio';
import { Observable } from 'rxjs';
import { EmpresaConsignataria } from 'src/app/models/empresa-consignataria';
import { Convenio } from '../../../../models/convenio';
import { Empresa } from '../../../../models/empresa';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { BaseComponent } from '../../../base.components';
import { selectEmpresasConsignatarias, selectConvenioCount, selectConvenioPageShow } from '../../selectors/convenio.selectors';
import { consultarEmpresasConsignatariasConvenio, countConvenioSucesso, countConvenio, pesquisarConvenio, carreagarDependenciasConvenio } from '../../actions/convenio.actions';
import { PaginationLoadLazy } from '../../../../util/pagination';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-convenio',
  templateUrl: './convenio.component.html',
  styleUrls: ['./convenio.component.scss']
})
export class ConvenioComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('convenioForm', { static: false })
  form: NgForm;

  @ViewChild('conveniosTable', { static: false })
  table: Table;

  situacao = SituacaoConvenioEnum;
  pt: Object = languageCalendar

  empresasConsignatarias$: Observable<EmpresaConsignataria[]>;
  totalRegistros$: Observable<number>;
  registros$: Observable<Convenio[]>;

  empresa: Empresa;
  convenio: Convenio;
  empresaConsignatariaSelecionada: number;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.empresasConsignatarias$ = this.store.pipe(select(selectEmpresasConsignatarias));
    this.totalRegistros$ = this.store.pipe(select(selectConvenioCount));
    this.registros$ = this.store.pipe(select(selectConvenioPageShow));
  }

  ngOnDestroy() {
    this.store.dispatch(countConvenioSucesso({ filter: undefined, count: 0, afterCount: this.clearTable }));
  }

  carregar(empresa: Empresa) {
    this.store.dispatch(consultarEmpresasConsignatariasConvenio());
    this.limparConvenio();
    this.empresa = empresa;
    this.pesquisar();
    this.modal.open();
  }

  limparConvenio() {
    this.convenio = new Convenio();
    this.empresaConsignatariaSelecionada = undefined;
  }

  fechar() {
    this.limparConvenio();
    this.form.resetForm();
    this.modal.close();
  }

  pesquisar() {
    const filtro = new Convenio();
    filtro.empresa = new Empresa();
    filtro.empresa.id = this.empresa.id;

    this.store.dispatch(countConvenio({ filter: filtro, afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.table);
  }

  loadRegistros(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarConvenio({ page, sort }));
  }

  salvar() {
    if (this.form.valid) {
      this.convenio.empresa = new Empresa();
      this.convenio.empresa.id = this.empresa.id;
      this.convenio.empresa.version = this.empresa.version;

      this.convenio.empresaConsignataria = new EmpresaConsignataria();
      this.convenio.empresaConsignataria.id = this.empresaConsignatariaSelecionada;

      this.store.dispatch(carreagarDependenciasConvenio({ registro: this.convenio, afterSave: this.limparForm }));
    }
  }

  limparForm = () => {
    this.limparConvenio();
    this.form.resetForm();
  }
}
