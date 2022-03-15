import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { BaseComponent } from '../../../base.components';
import { NgForm } from '@angular/forms';
import { consultarConvenio } from '../../actions/consulta-convenio.actions';
import { Observable } from 'rxjs';
import { ConvenioVo } from '../../../../vo/convenio.vo';
import { selectConvenioConsulta } from '../../selectors/consulta-convenio.selectors';
import { TipoContatoEnum } from '../../../../enums/tipo.contato';

@Component({
  selector: 'app-consulta-convenio',
  templateUrl: './consulta-convenio.component.html',
  styleUrls: ['./consulta-convenio.component.scss']
})
export class ConsultaConvenioComponent extends BaseComponent implements OnInit {

  tipoContato = TipoContatoEnum;

  cnpj: string;

  convenio$: Observable<ConvenioVo>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.cnpj = '';
    this.convenio$ = this.store.pipe(select(selectConvenioConsulta));
  }

  consultar(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(consultarConvenio({ cnpj: this.cnpj }));
    }
  }

}
