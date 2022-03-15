import { Component, OnInit, ViewChild } from '@angular/core';
import { Evento } from '../../../../models/evento';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualiarStatusEvento } from '../../actions/eventos.action';
import { StatusEventoEnum } from '../../../../enums/status.evento';
import { ModalComponent } from '../../../../common/components/modal/modal.component';

@Component({
  selector: 'app-eventos-realizado',
  templateUrl: './eventos-realizado.component.html',
  styleUrls: ['./eventos-realizado.component.scss']
})
export class EventosRealizadoComponent implements OnInit {

  @ViewChild('modalRealizar', {static: false})
  modalRealizar: ModalComponent;

  evento: Evento;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(evento: Evento) {
    this.evento = evento;
    this.modalRealizar.open();
  }

  realizar() {
    this.store.dispatch(atualiarStatusEvento({ id: this.evento.id, status: StatusEventoEnum.REALIZADO }));
    this.modalRealizar.close();
  }

}
