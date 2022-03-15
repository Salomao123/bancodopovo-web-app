import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { Evento } from '../../../../models/evento';
import { NgForm } from '@angular/forms';
import { StatusEventoEnum } from '../../../../enums/status.evento';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { salvarEvento } from '../../actions/eventos.action';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-eventos-novo',
  templateUrl: './eventos-novo.component.html',
  styleUrls: ['./eventos-novo.component.scss']
})
export class EventosNovoComponent implements OnInit {

  @ViewChild('modal', { static: true })
  modal: ModalComponent;

  @ViewChild('eventosNovoForm', { static: false })
  form: NgForm;
  pt: Object = languageCalendar
  evento: Evento;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {}

  adicionar() {
    this.evento = new Evento();
    this.modal.open();
  }

  editar(evento: Evento) {
    this.evento = Object.assign({}, evento);
    this.evento.dataEvento = new Date(this.evento.dataEvento);
    this.modal.open();
  }

  salvar() {
    if (this.form.valid) {
    var status = StatusEventoEnum;
    this.evento.status = status.PENDENTE;
      this.store.dispatch(salvarEvento({ registro: Object.assign({}, this.evento), afterSave: this.fecharModal }));
    }
  }

  fecharModal = () => {
    this.form.resetForm();
    this.modal.close();
  }

}
