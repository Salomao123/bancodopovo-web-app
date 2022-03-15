import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { BaseComponent } from '../../../base.components';
import { Parametro } from '../../../../models/parametro';
import { selectParametros } from '../../selectors/parametro.selectors';
import { recuperarParametros, salvarParametros } from '../../actions/parametros.actions';
import { ParametrosBoletoComponent } from '../parametros-boleto/parametros-boleto.component';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss']
})
export class ParametrosComponent extends BaseComponent implements OnInit {

  @ViewChild('parametrosBoleto', { static: false })
  parametroBoletoComponent: ParametrosBoletoComponent;

  parametro: Parametro;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.store.pipe(select(selectParametros)).subscribe(
      res => this.parametro = Object.assign({}, res)
    );

    this.store.dispatch(recuperarParametros());
  }

  salvar() {
    this.store.dispatch(salvarParametros({ parametro: Object.assign({}, this.parametro) }));
  }

  carregarParametrosBoleto() {
    this.parametroBoletoComponent.carregar();
  }

}
