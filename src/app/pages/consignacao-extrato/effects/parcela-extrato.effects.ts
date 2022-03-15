import { BaseEffects } from '../../base.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { PropostaService } from '../../../services/proposta.service';
import * as ConsignacaoExtratoActions from '../actions/consignacao-extrato.actions';
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { selectParcelasPropostaParcelaExtrato } from '../selectors/parcela-extrato.selectors';

export class ParcelaExtratoEffects extends BaseEffects {

    recuperarParcelasPropostaConsignacaoExtrato$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoExtratoActions.recuperarParcelasPropostasConsignacaoExtrato),
        withLatestFrom(this.store.pipe(select(selectParcelasPropostaParcelaExtrato))),
        mergeMap(([action, parcelasState]) => {
            if (parcelasState && parcelasState.length > 0) {
                return of(ConsignacaoExtratoActions.recuperarParcelasPropostasConsignacaoExtratoSucesso(
                    { parcelas: parcelasState, after: action.after }));
            } else {
                return this.propostaService.recuperarParcelas(action.idProposta).pipe(
                    map(parcelas => ConsignacaoExtratoActions.recuperarParcelasPropostasConsignacaoExtratoSucesso(
                        { parcelas, after: action.after })),
                    catchError(err => {
                        super.addMessageError(err);
                        return of(ConsignacaoExtratoActions.recuperarParcelasPropostasConsignacaoExtratoErro());
                    })
                );
            }
        })
    ));

    recuperarParcelasPropostaConsignacaoExtratoSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoExtratoActions.recuperarParcelasPropostasConsignacaoExtratoSucesso),
        tap(action => action.after())
    ), {dispatch: false});

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private propostaService: PropostaService){
        super();
    }
}
