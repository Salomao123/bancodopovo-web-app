import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input()
  id: string;

  @Input()
  titulo: string;

  @Input()
  sizeClass: string;

  @Input()
  modalVinculada: string;

  @Input()
  showModalVinculadaOnClose: boolean;

  @Output()
  fechar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (!this.showModalVinculadaOnClose) {
      this.showModalVinculadaOnClose = false;
    }
  }

  open() {
    if (this.modalVinculada) {
      $('#' + this.modalVinculada + '_modal').modal('hide');
    }

    $('#' + this.id + '_modal').modal('show');
  }

  close() {
    $('#' + this.id + '_modal').modal('hide');

    if (this.modalVinculada && this.showModalVinculadaOnClose) {
      $('#' + this.modalVinculada + '_modal').modal('show');
    }
  }

}
