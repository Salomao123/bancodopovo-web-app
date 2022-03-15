import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { Emprestimo } from '../../../../models/emprestimo';
import { NgForm } from '@angular/forms';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { salvarEmprestimo } from '../../actions/emprestimos.action';

@Component({
  selector: 'app-emprestimos-novo',
  templateUrl: './emprestimos-novo.component.html',
  styleUrls: ['./emprestimos-novo.component.scss']
})
export class EmprestimosNovoComponent implements OnInit {

  @ViewChild('modal', { static: true })
  modal: ModalComponent;

  @ViewChild('emprestimosNovoForm', { static: false })
  form: NgForm;

  emprestimo: Emprestimo;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {}

  adicionar() {
    this.emprestimo = new Emprestimo();
    this.modal.open();
  }

  editar(emprestimo: Emprestimo) {
    this.emprestimo = Object.assign({}, emprestimo);
    this.modal.open();
  }

  salvar() {
    if (this.form.valid) {
      this.store.dispatch(salvarEmprestimo({ registro: Object.assign({}, this.emprestimo), afterSave: this.fecharModal }));
    }
  }

  fecharModal = () => {
    this.form.resetForm();
    this.modal.close();
  }

}
