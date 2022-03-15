import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { SituacaoVisualizacaoMargemEnum } from '../../../../enums/situacao.visualizacao.margem';
import { atualizarSituacaoVisualizacaoMargem } from '../../actions/visualizacao-margem.actions';
import { ModalComponent } from '../../../../common/components/modal/modal.component';

@Component({
  selector: 'app-visualizacao-margem-situacao',
  templateUrl: './visualizacao-margem-situacao.component.html',
  styleUrls: ['./visualizacao-margem-situacao.component.scss']
})
export class VisualizacaoMargemSituacaoComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  situacao = SituacaoVisualizacaoMargemEnum;

  id: number;
  novaSituacao: SituacaoVisualizacaoMargemEnum;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  carregar(id: number, novaSituacao: SituacaoVisualizacaoMargemEnum) {
    this.id = id;
    this.novaSituacao = novaSituacao;

    this.modal.open();
  }

  confirmar() {
    this.store.dispatch(atualizarSituacaoVisualizacaoMargem({ id: this.id, situacao: this.novaSituacao }));
    this.modal.close();
  }

}
