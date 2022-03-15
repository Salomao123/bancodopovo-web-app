import { BaseEffects } from '../../base.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EmpregadoConsignanteService } from '../../../services/empregado-consignante.service';
import * as SimuladorActions from '../actions/simulador.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SimulacaoService } from '../../../services/simulacao.service';
import { AppState } from '../../../reducers/index';

export class SimuladorEffects extends BaseEffects {

    recuperarVinculosSimulador$ = createEffect(() => this.actions$.pipe(
        ofType(SimuladorActions.recuperarVinculosSimulador),
        mergeMap(action => {
            return this.empregadoConsignanteService.recuperarPorUsario().pipe(
                map(empregados => SimuladorActions.recuperarVinculosSimuladorSucesso({ empregados })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(SimuladorActions.recuperarVinculosSimuladorErro());
                })
            );
        })
    ));

    compararSimulacaoSimulador$ = createEffect(() => this.actions$.pipe(
        ofType(SimuladorActions.compararSimulacoesSimulador),
        mergeMap(action => {
            return this.simulacaoService.simular(action.empregadoConsignante, action.simulacaoVo).pipe(
                map(simulacoes => SimuladorActions.compararSimulacoesSimuladorSucesso({ simulacoes })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(SimuladorActions.compararSimulacoesSimuladorErro());
                })
            );
        })
    ));

    realizarSimulacaoSimulador$ = createEffect(() => this.actions$.pipe(
        ofType(SimuladorActions.realizarSimulacaoSimulador),
        mergeMap(action => {
            return this.simulacaoService.realizarSimulacao(action.idServicoConsignacao, action.simulacaoVo).pipe(
                map(simulacoes => SimuladorActions.realizarSimulacaoSimuladorSucesso(
                    { idServicoConsignacao: action.idServicoConsignacao, simulacoes, afterSimulacao: action.afterSimulacao })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(SimuladorActions.realizarSimulacaoSimuladorErro());
                })
            );
        })
    ));

    realizarSimulacaoSimuladorSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(SimuladorActions.realizarSimulacaoSimuladorSucesso),
        tap(action => action.afterSimulacao())
    ), {dispatch: false});

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private empregadoConsignanteService: EmpregadoConsignanteService,
                private simulacaoService: SimulacaoService) {
        super();
    }
}
