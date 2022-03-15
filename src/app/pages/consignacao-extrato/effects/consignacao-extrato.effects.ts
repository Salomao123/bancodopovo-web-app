import { BaseEffects } from '../../base.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ConsignacaoExtratoActions from '../actions/consignacao-extrato.actions';
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { EmpregadoConsignanteService } from '../../../services/empregado-consignante.service';
import { of } from 'rxjs';
import { PropostaService } from '../../../services/proposta.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { selectPropostasConsignacaoExtrato } from '../selectors/consignacao-extrato.selectors';

export class ConsignacaoExtratoEffects extends BaseEffects {

    recuperarVinculosConsignacaoExtrato$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoExtratoActions.recuperarVinculosConsignacaoExtrato),
        mergeMap(action => {
            return this.empregadoConsignanteService.recuperarPorUsario().pipe(
                map(consignados => ConsignacaoExtratoActions.recuperarVinculosConsignacaoExtratoSucesso({ consignados })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ConsignacaoExtratoActions.recuperarVinculosConsignacaoExtratoErro());
                })
            );
        })
    ));

    recuperarVinculosConsignacaoExtratoSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoExtratoActions.recuperarVinculosConsignacaoExtratoSucesso),
        mergeMap(action => {
            return of(ConsignacaoExtratoActions.recuperarPropostasConsignacaoExtrato(
                { consignadoSelecionado: action.consignados[0].id, after: () => {} }));
        })
    ));

    recuperarPropostasConsignacaoExtrato$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoExtratoActions.recuperarPropostasConsignacaoExtrato),
        withLatestFrom(this.store.pipe(select(selectPropostasConsignacaoExtrato))),
        mergeMap(([action, propostasState]) => {
            if (propostasState && propostasState.length > 0) {
                return of(ConsignacaoExtratoActions.recuperarPropostasConsignacaoExtratoSucesso(
                    { propostas: propostasState, after: action.after }));
            } else {

                return this.propostaService.recuperarPorEmpregado(action.consignadoSelecionado).pipe(
                    map(propostas => ConsignacaoExtratoActions.recuperarPropostasConsignacaoExtratoSucesso(
                        { propostas, after: action.after })),
                    catchError(err => {
                        super.addMessageError(err);
                        return of(ConsignacaoExtratoActions.recuperarPropostasConsignacaoExtratoErro());
                    })
                );
            }
        })
    ));

    recuperarPropostasConsignacaoExtratoSuceso$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoExtratoActions.recuperarPropostasConsignacaoExtratoSucesso),
        tap(action => action.after())
    ), {dispatch: false});

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private propostaService: PropostaService,
                private empregadoConsignanteService: EmpregadoConsignanteService) {
        super();
    }
}
