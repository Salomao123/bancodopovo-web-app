import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { NgForm } from '@angular/forms';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Observable } from 'rxjs';
import { Pessoa } from '../../../../models/pessoa';
import { EmpresaConsignataria } from '../../../../models/empresa-consignataria';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectPessoasJuridicas, selectBancos } from '../../selectors/empresa-consignataria.selectors';
import { consultarPessoasJuridicasEmpCons, salvarEmpresaConsignataria, consultarBancosEmpCons } from '../../actions/empresa-consignataria.actions';
import { Banco } from '../../../../models/banco';

@Component({
  selector: 'app-empresa-consignataria-novo',
  templateUrl: './empresa-consignataria-novo.component.html',
  styleUrls: ['./empresa-consignataria-novo.component.scss']
})
export class EmpresaConsignatariaNovoComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('empresaNovoForm', { static: false })
  form: NgForm;

  status = StatusRegistroEnum;

  pessoas$: Observable<Pessoa[]>;
  bancos$: Observable<Banco[]>;

  empresaConsignataria: EmpresaConsignataria;
  idPessoa: number;
  idBanco: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.pessoas$ = this.store.pipe(select(selectPessoasJuridicas));
    this.bancos$ = this.store.pipe(select(selectBancos));

    this.store.dispatch(consultarPessoasJuridicasEmpCons());
    this.store.dispatch(consultarBancosEmpCons());
  }

  adicionar() {
    this.idPessoa = undefined;
    this.idBanco = undefined;

    this.empresaConsignataria = new EmpresaConsignataria();
    this.empresaConsignataria.status = this.status.ATIVO;

    this.modal.open();
  }

  editar(empresa: EmpresaConsignataria) {
    this.empresaConsignataria = Object.assign({}, empresa);
    this.idPessoa = empresa.pessoa.id;
    this.idBanco = empresa.banco.id;

    this.modal.open();
  }

  salvar() {
    if (this.form.valid) {
      this.carregarPessoa();
      this.carregarBanco();

      this.store.dispatch(salvarEmpresaConsignataria({ registro: Object.assign({}, this.empresaConsignataria),
        afterSave: this.fecharModal }));
    }
  }

  fecharModal = () => {
    this.form.resetForm();
    this.modal.close();
  }

  carregarPessoa() {
    if (!(this.empresaConsignataria.pessoa) || (this.empresaConsignataria.pessoa.id !== this.idPessoa)) {
      this.pessoas$.subscribe(res => {
        const pessoas = res.filter(p => p.id === this.idPessoa);
        this.empresaConsignataria.pessoa = pessoas[0];
      });
    }
  }

  carregarBanco() {
    if (!(this.empresaConsignataria.banco) || (this.empresaConsignataria.banco.id !== this.idBanco)) {
      this.bancos$.subscribe(res => {
        const bancos = res.filter(b => b.id === this.idBanco);
        this.empresaConsignataria.banco = bancos[0];
      });
    }
  }
}
