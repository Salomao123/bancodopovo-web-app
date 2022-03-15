import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { SituacaoConvenioEnum } from '../../../../enums/situacao.convenio';
import { Convenio } from '../../../../models/convenio';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { atualizarStatusConvenio } from '../../actions/convenio.actions';

@Component({
  selector: 'app-convenio-status',
  templateUrl: './convenio-status.component.html',
  styleUrls: ['./convenio-status.component.scss']
})
export class ConvenioStatusComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  titulo: string;
  mensagem: string;

  situacao: SituacaoConvenioEnum;
  convenio: Convenio;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.titulo = '';
  }

  carregar(convenio: Convenio, situacao: SituacaoConvenioEnum, titulo: string, mensagem: string) {
    this.convenio = convenio;
    this.situacao = situacao;

    this.titulo = titulo;
    this.mensagem = mensagem;

    this.modal.open();
  }

  salvar() {
    this.store.dispatch(atualizarStatusConvenio({ id: this.convenio.id, situacao: this.situacao }));
    this.modal.close();
  }

}
