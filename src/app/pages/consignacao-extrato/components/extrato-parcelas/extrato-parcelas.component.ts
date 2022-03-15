import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { Observable } from 'rxjs';
import { Parcela } from '../../../../models/parcela';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { BaseComponent } from '../../../base.components';
import { selectParcelasPropostaParcelaExtrato } from '../../selectors/parcela-extrato.selectors';
import { SituacaoParcelaEnum } from '../../../../enums/situacao.parcela';

@Component({
  selector: 'app-extrato-parcelas',
  templateUrl: './extrato-parcelas.component.html',
  styleUrls: ['./extrato-parcelas.component.scss']
})
export class ExtratoParcelasComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  situacao = SituacaoParcelaEnum;

  parcelas$: Observable<Parcela[]>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.parcelas$ = this.store.pipe(select(selectParcelasPropostaParcelaExtrato));
  }

  carregar() {
    this.modal.open();
  }

  fechar() {
    this.modal.close();
  }

}
