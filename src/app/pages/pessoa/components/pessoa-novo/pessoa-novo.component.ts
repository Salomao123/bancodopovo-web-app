import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { Pessoa } from '../../../../models/pessoa';
import { NgForm } from '@angular/forms';
import { TipoPessoaEnum } from '../../../../enums/tipo.pessoa';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { EstadoCivilEnum } from '../../../../enums/estado.civil';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { salvarPessoa } from '../../actions/pessoa.action';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-pessoa-novo',
  templateUrl: './pessoa-novo.component.html',
  styleUrls: ['./pessoa-novo.component.scss']
})
export class PessoaNovoComponent implements OnInit {

  @ViewChild('modal', { static: true })
  modal: ModalComponent;

  @ViewChild('pessoaNovoForm', { static: false })
  form: NgForm;

  pessoa: Pessoa;

  cpfReplace: string = '';
  tipoPessoa = TipoPessoaEnum;
  status = StatusRegistroEnum;
  estadoCivil = EstadoCivilEnum;
  pt: Object = languageCalendar

  maxDate: Date = new Date(Date.now());

  constructor(private store: Store<AppState>) { }

  ngOnInit() {}

  validarCPF(inputCPF: string) {
    let Soma: number;
    let Resto: number;
    Soma = 0;
  
    if (inputCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++)
      Soma = Soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(inputCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++)
      Soma = Soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(inputCPF.substring(10, 11))) return false;
    return true;
  }

  formatInput(event: any) {
    const text = event.target.value;
    const formattedText = text.replace(/[^A-Za-z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ-]/g,"");
    event.target.value = formattedText;
  }

  adicionar() {
    this.pessoa = new Pessoa();
    this.pessoa.status = this.status.ATIVO;
    this.modal.open();
  }

  editar(pessoa: Pessoa) {
    this.pessoa = Object.assign({}, pessoa);
    this.modal.open();
  }

  formatarCPF() {
    let cpfValue = (document.getElementById("cpf") as HTMLInputElement).value;
    cpfValue = cpfValue.replace(".", "").replace(".", "").replace("-", "");

    return cpfValue;
  }

  salvar() {
    const cpfInput = document.getElementById("cpf");

    console.log(cpfInput);

    if (cpfInput !== null) {
    const cpfValue = this.formatarCPF();

    console.log(cpfValue);

    if (this.form.valid && this.validarCPF(cpfValue)) {
      this.store.dispatch(
        salvarPessoa({
          registro: Object.assign({}, this.pessoa),
          afterSave: this.fecharModal,
        })
      );
    }
    if (!this.validarCPF(cpfValue)) {
      cpfInput.classList.add("is-invalid");
    }
  }
    if (this.form.valid) {
      this.store.dispatch(
        salvarPessoa({
          registro: Object.assign({}, this.pessoa),
          afterSave: this.fecharModal,
        })
      );
    }
  }

  verificaValidTouched(campo) {
    return !campo.valid && campo.touched;
  }

  aplicaErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback' : this.verificaValidTouched(campo)
  }
  }

  fecharModal = () => {
    this.form.resetForm();
    this.modal.close();
    window.location.reload()
  }

}
