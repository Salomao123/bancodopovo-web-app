import { Component, OnInit, ViewChild } from '@angular/core';
import { Evento } from '../../../../models/evento';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualiarStatusEvento } from '../../actions/eventos.action';
import { StatusEventoEnum } from '../../../../enums/status.evento';
import { ModalComponent } from '../../../../common/components/modal/modal.component';

@Component({
  selector: 'app-eventos-cancelado',
  templateUrl: './eventos-cancelado.component.html',
  styleUrls: ['./eventos-cancelado.component.scss']
})
export class EventosCanceladoComponent implements OnInit {

  @ViewChild('modalCancelar', {static: false})
  modalCancelar: ModalComponent;

  evento: Evento;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(evento: Evento) {
    this.evento = evento;
    this.modalCancelar.open();
  }

  cancelar() {
    this.store.dispatch(atualiarStatusEvento({ id: this.evento.id, status: StatusEventoEnum.CANCELADO }));
    this.modalCancelar.close();
  }

}
