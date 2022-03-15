import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../../base.components';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { Observable } from 'rxjs';
import { EmpregadoConsignante } from '../../../../models/empregado-consignante';
import { selectEmpregadosSimulador, selectSimulacoesSimulador } from '../../selectors/simulador.selectors';
import { recuperarVinculosSimulador, compararSimulacoesSimulador, realizarSimulacaoSimulador, compararSimulacoesSimuladorSucesso, limparSimulacoesSimulador } from '../../actions/simulador.actions';
import { SimulacaoVo } from '../../../../vo/simulacao.vo';
import { NgForm } from '@angular/forms';
import { FormatadoresUtil } from '../../../../util/formatadores';
import { SimulacaoEmprestimoVo } from '../../../../vo/simulacao.emprestimo.vo';
import { SimuladorDetalheComponent } from '../simulador-detalhe/simulador-detalhe.component';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})
export class SimuladorComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('simuladoDetalhe', { static: false })
  simuladoDetalhe: SimuladorDetalheComponent;

  empregados$: Observable<EmpregadoConsignante[]>;
  simulacoes$: Observable<SimulacaoVo[]>;

  empregadoSelecionado: EmpregadoConsignante;
  simulacaoVo: SimulacaoEmprestimoVo;

  valorEmprestimoFormatado: string;

  constructor(private store: Store<AppState>) {
    super(store);
    this.simulacaoVo = new SimulacaoEmprestimoVo();
  }

  ngOnInit() {
    this.empregados$ = this.store.pipe(select(selectEmpregadosSimulador));
    this.simulacoes$ = this.store.pipe(select(selectSimulacoesSimulador));
    this.store.dispatch(recuperarVinculosSimulador());
  }

  ngOnDestroy() {
    this.store.dispatch(limparSimulacoesSimulador());
  }

  comparar(form: NgForm) {
    if (form.valid) {
      this.simulacaoVo.valorEmprestimo = FormatadoresUtil.parseMoeda(this.valorEmprestimoFormatado);
      this.store.dispatch(compararSimulacoesSimulador(
        { empregadoConsignante: this.empregadoSelecionado.id, simulacaoVo: Object.assign({}, this.simulacaoVo) }));
    }
  }

  detalhar(idServicoConsignacao: number) {
    this.store.dispatch(realizarSimulacaoSimulador(
      { idServicoConsignacao, simulacaoVo: this.simulacaoVo, afterSimulacao: this.openDetalhe }));
  }

  openDetalhe = () => {
    this.simuladoDetalhe.carregar();
  }
}
