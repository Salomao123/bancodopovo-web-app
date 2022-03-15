import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { NgForm } from '@angular/forms';
import { Perfil } from '../../../../models/perfil';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { salvarPerfil } from '../../actions/perfil.actions';

@Component({
  selector: 'app-perfil-novo',
  templateUrl: './perfil-novo.component.html',
  styleUrls: ['./perfil-novo.component.scss']
})
export class PerfilNovoComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('perfilNovoForm', { static: false })
  form: NgForm;

  status = StatusRegistroEnum;
  perfil: Perfil;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  adicionar() {
    this.perfil = new Perfil();
    this.perfil.status = this.status.ATIVO;

    this.modal.open();
  }

  editar(perfil: Perfil) {
    this.perfil = Object.assign({}, perfil);
    this.modal.open();
  }

  salvar() {
    if (this.form.valid) {
      this.store.dispatch(salvarPerfil({ perfil: Object.assign({}, this.perfil), afterSave: this.fecharModal }));
    }
  }

  fecharModal = () => {
    this.form.resetForm();
    this.modal.close();
  }

}
