import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Pessoa } from '../../../../models/pessoa';
import { Empresa } from '../../../../models/empresa';
import { EmpregadoConsignante } from 'src/app/models/empregado-consignante';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectPessoasFisicas, selectEmpresas } from '../../selectors/empregado-consignante.selectors';
import { consultarPessoasFisicasEmpregadoConsignante, consultarEmpresasEmpregadoConsignante, salvarEmpregadoConsignante } from '../../actions/empregado-consignante.actions';
import { EstadoCivilEnum } from '../../../../enums/estado.civil';
import { FormatadoresUtil } from '../../../../util/formatadores';

@Component({
  selector: 'app-empregado-consignante-novo',
  templateUrl: './empregado-consignante-novo.component.html',
  styleUrls: ['./empregado-consignante-novo.component.scss']
})
export class EmpregadoConsignanteNovoComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('empregadoConsignanteNovoForm', { static: false })
  form: NgForm;

  pessoas$: Observable<Pessoa[]>;
  empresas$: Observable<Empresa[]>;

  empregadoConsignante: EmpregadoConsignante;
  pessoaSelecionada: number;
  empresaSelecionada: number;

  status = StatusRegistroEnum;
  estadoCivil = EstadoCivilEnum;

  salarioFormatado: string;
  margemFormatado: string;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.pessoas$ = this.store.pipe(select(selectPessoasFisicas));
    this.empresas$ = this.store.pipe(select(selectEmpresas));

    this.store.dispatch(consultarPessoasFisicasEmpregadoConsignante());
    this.store.dispatch(consultarEmpresasEmpregadoConsignante());
  }

  adicionar() {
    this.empregadoConsignante = new EmpregadoConsignante();
    this.empregadoConsignante.status = this.status.ATIVO;

    this.pessoaSelecionada = undefined;
    this.empresaSelecionada = undefined;

    this.modal.open();
  }

  editar(empregadoConsignante: EmpregadoConsignante) {
    this.empregadoConsignante = Object.assign({}, empregadoConsignante);

    this.pessoaSelecionada = this.empregadoConsignante.pessoa.id;
    this.empresaSelecionada = this.empregadoConsignante.empresa.id;

    this.salarioFormatado = FormatadoresUtil.formatarMoeda(this.empregadoConsignante.salario);
    this.margemFormatado = FormatadoresUtil.formatarMoeda(this.empregadoConsignante.margem);

    this.modal.open();
  }

  salvar() {
    if (this.form.valid) {
      this.carregarPessoa();
      this.carregarEmpresa();

      this.empregadoConsignante.salario = FormatadoresUtil.parseMoeda(this.salarioFormatado);
      this.empregadoConsignante.margem = FormatadoresUtil.parseMoeda(this.margemFormatado);

      this.store.dispatch(salvarEmpregadoConsignante(
        { registro: Object.assign({}, this.empregadoConsignante), afterSave: this.fecharModal }));
    }
  }

  currencyInputChange(value) {
    const num = value.replace(/\D/g, '');
    return Number(num);
  }

  fecharModal = () => {
    this.form.resetForm();
    this.modal.close();
  }

  carregarPessoa() {
    if (!(this.empregadoConsignante.pessoa) || (this.empregadoConsignante.pessoa.id !== this.pessoaSelecionada)) {
      this.pessoas$.subscribe(res => {
        const pessoas = res.filter(p => p.id === this.pessoaSelecionada);
        this.empregadoConsignante.pessoa = Object.assign({}, pessoas[0]);
      });
    }
  }

  carregarEmpresa() {
    if (!(this.empregadoConsignante.empresa) || (this.empregadoConsignante.empresa.id !== this.empresaSelecionada)) {
      this.empresas$.subscribe(res => {
        const empresas = res.filter(e => e.id === this.empresaSelecionada);
        this.empregadoConsignante.empresa = Object.assign({}, empresas[0]);
      });
    }
  }

}
