import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { VisualizacaoMargem } from '../../../../models/visualizacao-margem';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectMargem } from '../../selectors/consulta-margem.selectors';
import { consultarMargem, solicitarConsultaMargem, limparMargemConsulta } from '../../actions/consulta-margem.actions';
import { NgForm } from '@angular/forms';
import { EmpregadoConsignante } from 'src/app/models/empregado-consignante';
import { Pessoa } from 'src/app/models/pessoa';
import { SituacaoVisualizacaoMargemEnum } from '../../../../enums/situacao.visualizacao.margem';
import { BaseComponent } from '../../../base.components';

@Component({
  selector: 'app-consulta-margem',
  templateUrl: './consulta-margem.component.html',
  styleUrls: ['./consulta-margem.component.scss']
})
export class ConsultaMargemComponent extends BaseComponent implements OnInit, OnDestroy {

  situacao = SituacaoVisualizacaoMargemEnum;

  cpf: string;
  margem$: Observable<VisualizacaoMargem>;

  constructor(private store: Store<AppState>) {
    super(store);
    this.cpf = '';
  }

  ngOnInit() {
    this.margem$ = this.store.pipe(select(selectMargem));
  }

  ngOnDestroy() {
    this.store.dispatch(limparMargemConsulta());
  }

  consultar(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(consultarMargem({ cpf: this.cpf }));
    }
  }

  solicitar() {
    const margem = new VisualizacaoMargem();
    margem.pessoa = new Pessoa();
    margem.pessoa.documento = this.cpf;

    this.store.dispatch(solicitarConsultaMargem({ margem, afterSolicitar: () => {} }));
  }
}
