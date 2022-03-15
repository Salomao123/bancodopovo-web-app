import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Visita } from '../../../../models/visita';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualiarStatusVisita } from '../../actions/visitas.action';

@Component({
  selector: 'app-visitas-status',
  templateUrl: './visitas-status.component.html',
  styleUrls: ['./visitas-status.component.scss']
})
export class VisitasStatusComponent implements OnInit {

  @ViewChild('modalStatus', { static: false })
  modal: ModalComponent;

  status = StatusRegistroEnum;
  visita: Visita;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(visita: Visita) {
    this.visita = visita;
    this.modal.open();
  }

  salvar() {
    const status = (this.status.ATIVO === this.visita.status) ? this.status.INATIVO : this.status.ATIVO;
    this.store.dispatch(atualiarStatusVisita({ id: this.visita.id, status }));
    this.fecharModal();
  }

  fecharModal = () => {
    this.modal.close();
  }

}
