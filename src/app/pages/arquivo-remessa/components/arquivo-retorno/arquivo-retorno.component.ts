import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { enviarArquivoRetorno } from '../../actions/arquivo-remessa.actions';

@Component({
  selector: 'app-arquivo-retorno',
  templateUrl: './arquivo-retorno.component.html',
  styleUrls: ['./arquivo-retorno.component.scss']
})
export class ArquivoRetornoComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('arquivoRetornoForm', { static: false })
  form: NgForm;

  file: File;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  abrir() {
    this.modal.open();
  }

  selectFile(event) {
    this.file = event.target.files[0];
  }

  enviar() {
    this.store.dispatch(enviarArquivoRetorno({ file: this.file, afterEnvio: this.fechar }));
  }

  fechar = () => {
    this.file = undefined;

    this.form.resetForm();
    this.modal.close();
  }

}
