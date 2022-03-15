import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { EmpregadoConsignante } from 'src/app/models/empregado-consignante';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualizarStatusEmpregadoConsignante } from '../../actions/empregado-consignante.actions';

@Component({
  selector: 'app-empregado-consignante-status',
  templateUrl: './empregado-consignante-status.component.html',
  styleUrls: ['./empregado-consignante-status.component.scss']
})
export class EmpregadoConsignanteStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  empregadoConsignante: EmpregadoConsignante;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(empregadoConsignante: EmpregadoConsignante) {
    this.empregadoConsignante = empregadoConsignante;
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.empregadoConsignante.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualizarStatusEmpregadoConsignante({ id: this.empregadoConsignante.id, status }));
    this.modal.close();
  }

}
