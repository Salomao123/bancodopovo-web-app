import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

declare var $: any;

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @Input()
  id: string;

  @Input()
  titulo: string;

  @Input()
  mensagem: string;

  @Input()
  sizeClass: string;

  @Input()
  modalVinculada: string;

  @Output()
  confirmar: EventEmitter<any> = new EventEmitter();

  @Output()
  cancelar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (!this.titulo) {
      this.titulo = 'Confirmar';
    }
  }

  open() {
    this.modal.open();
  }

  execConfirmacao() {
    this.confirmar.emit();
    this.modal.close();
  }

  execCancelamento() {
    this.cancelar.emit();
    this.modal.close();

    if (this.modalVinculada) {
      $('#' + this.modalVinculada + '_modal').modal('show');
    }
  }

}
