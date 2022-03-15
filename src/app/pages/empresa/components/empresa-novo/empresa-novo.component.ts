import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../../../models/empresa';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Pessoa } from 'src/app/models/pessoa';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectPessoasJuridicas } from '../../selectors/empresa.selectors';
import { consultarPessoasJuridicas, salvarEmpresa } from '../../actions/empresa.actions';

@Component({
  selector: 'app-empresa-novo',
  templateUrl: './empresa-novo.component.html',
  styleUrls: ['./empresa-novo.component.scss']
})
export class EmpresaNovoComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('empresaNovoForm', { static: false })
  form: NgForm;

  status = StatusRegistroEnum;

  pessoas$: Observable<Pessoa[]>;

  empresa: Empresa;
  idPessoa: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.pessoas$ = this.store.pipe(select(selectPessoasJuridicas));
    this.store.dispatch(consultarPessoasJuridicas());
  }

  adicionar() {

    this.idPessoa = undefined;
    this.empresa = new Empresa();
    this.empresa.status = this.status.ATIVO;

    this.modal.open();
  }

  editar(empresa: Empresa) {
    this.empresa = Object.assign({}, empresa);
    this.idPessoa = empresa.pessoa.id;
    this.modal.open();
  }

  salvar() {
    if (this.form.valid) {
      this.carregarPessoa();
      this.store.dispatch(salvarEmpresa({ empresa: Object.assign({}, this.empresa), afterSave: this.fecharModal }));
    }
  }

  fecharModal = () => {
    this.form.resetForm();
    this.modal.close();
  }

  carregarPessoa() {
    if (!(this.empresa.pessoa) || (this.empresa.pessoa.id !== this.idPessoa)) {
      this.pessoas$.subscribe(res => {
        const pessoas = res.filter(p => p.id === this.idPessoa);
        this.empresa.pessoa = pessoas[0];
      });
    }
  }
}
