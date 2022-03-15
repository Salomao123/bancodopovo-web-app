import swal from 'sweetalert';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { Pessoa } from '../../../../models/pessoa';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { FuncionalidadeEnum } from '../../../../enums/funcionalidade';
import { AcaoEnum } from '../../../../enums/acao';
import { selectExistFuncionalidadeAcao } from '../../../../public/login/selectors/login.selectors';
import { PessoaService } from '../../../../services/pessoa.service';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-pessoa-financeiro',
  templateUrl: './pessoa-financeiro.component.html',
  styleUrls: ['./pessoa-financeiro.component.scss']
})
export class PessoaFinanceiroComponent implements OnInit {

  funcionalidadeEnum = FuncionalidadeEnum;
  acaoEnum = AcaoEnum;
  pt: Object = languageCalendar

  @ViewChild('modalFinanceiro', { static: true })
  modal: ModalComponent;

  @ViewChild('pessoaFinanceiroForm', { static: false })
  form: NgForm;

  pessoa: Pessoa;

  constructor(private store: Store<AppState>, private pessoaService: PessoaService) { }

  ngOnInit() {}

  carregar(pessoa: Pessoa) {
    this.pessoa = Object.assign({}, pessoa);
    this.pessoaService.recuperarPorId(this.pessoa.id).subscribe(
      p => this.preencherDadosPessoa(p),
      error => this.addMessageError(error));
    console.log(this.pessoa);
    this.modal.open();
  }

  preencherDadosPessoa(p: Pessoa) {
    this.pessoa = p;
    if (this.pessoa.indicadorNomeSujo == null || !this.pessoa.indicadorNomeSujo) {
      this.pessoa.indicadorNomeSujo = undefined;
    }
  }

  salvar() {
    if (this.form.valid) {
      this.pessoaService.salvarDadosFinanceiros(this.pessoa).subscribe(
        p => this.addMessageSucess(p),
        error => this.addMessageError(error));
    }
  }

  addMessageSucess(p: Pessoa) {
    this.fecharModal();
    swal({
      text: 'Dados Financeiros salvos com sucesso',
      icon: 'success',
      buttons: ['Fechar', false]
    });
  }

  addMessageError(error?: any) {

    let message: string;

    if (error && error.hasOwnProperty('error')) {
        const innerError = error.error;
        if (innerError && innerError.hasOwnProperty('message')) {
            message = innerError.message;
        }
    }

    if (!message) {
        message = 'Erro Inesperado!';
    }

    swal({
        text: message,
        icon: 'error',
        buttons: ['Fechar', false]
    });

  }

  fecharModal = () => {
    this.form.resetForm();
    this.modal.close();
  }

  permiteFuncionalidadeAcao(f: number, a: number) {
    return this.store.pipe(select(selectExistFuncionalidadeAcao(f, a)));
  }

}
