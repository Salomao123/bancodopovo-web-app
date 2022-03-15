import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { EmpresaConsignataria } from '../../../../models/empresa-consignataria';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualizarStatusEmpresaConsignataria } from '../../actions/empresa-consignataria.actions';

@Component({
  selector: 'app-empresa-consignataria-status',
  templateUrl: './empresa-consignataria-status.component.html',
  styleUrls: ['./empresa-consignataria-status.component.scss']
})
export class EmpresaConsignatariaStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  empresaConsignataria: EmpresaConsignataria;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(empresaConsignataria: EmpresaConsignataria) {
    this.empresaConsignataria = Object.assign({}, empresaConsignataria);
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.empresaConsignataria.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualizarStatusEmpresaConsignataria({ id: this.empresaConsignataria.id, status }));
    this.modal.close();
  }

}
