import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Empresa } from '../../../../models/empresa';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualiarStatusEmpresa } from '../../actions/empresa.actions';

@Component({
  selector: 'app-empresa-status',
  templateUrl: './empresa-status.component.html',
  styleUrls: ['./empresa-status.component.scss']
})
export class EmpresaStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  empresa: Empresa;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(empresa: Empresa) {
    this.empresa = Object.assign({}, empresa);
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.empresa.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualiarStatusEmpresa({ id: this.empresa.id, status }));
    this.modal.close();
  }

}
