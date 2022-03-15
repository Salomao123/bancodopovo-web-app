import { BaseEffects } from '../../base.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaxasParcelasActions from '../actions/taxas-parcelas.actions';
import { tap, withLatestFrom, mergeMap, map, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { selectParcelasSelecionadasTaxasParcelas, selectParcelasTaxasParcelas } from '../selectors/taxas-parcelas.selectors';
import { of } from 'rxjs';
import { ServicoConsignacaoService } from '../../../services/servico-consignacao.service';

export class TaxasParcelasEffects extends BaseEffects {

    carregarParcelasTaxasParcelas$ = createEffect(() => this.actions$.pipe(
        ofType(TaxasParcelasActions.carregarParcelasTaxasParcelas),
        tap(action => action.afterCarregar())
    ), {dispatch: false});

    carregarJurosEncargosTaxasParcelas$ = createEffect(() => this.actions$.pipe(
        ofType(TaxasParcelasActions.carregarJurosEncargosTaxasParcelas),
        withLatestFrom(this.store.pipe(select(selectParcelasSelecionadasTaxasParcelas))),
        mergeMap(([action, servicosParcelas]) => {
            const parcelas = servicosParcelas.map(sp => {
                const p = Object.assign({}, sp.objeto);
                p.juros = action.juros;
                p.encargos = action.encargos;
                return p;
            });

            return of(TaxasParcelasActions.carregarJurosEncargosTaxasParcelasSucesso({ parcelas }));
        })
    ));

    atualizarParcelasTaxasParcelas$ = createEffect(() => this.actions$.pipe(
        ofType(TaxasParcelasActions.atualizarParcelasTaxasParcelas),
        withLatestFrom(this.store.pipe(select(selectParcelasTaxasParcelas))),
        mergeMap(([action, servicosParcelas]) => {
            const parcelas = servicosParcelas.map(sp => sp.objeto);
            return this.servicoConsignacaoService.atualizarParcelas(parcelas).pipe(
                map(() => {
                    super.addMessageSuccess('Juros/Encargos atualizados com sucesso.');
                    return TaxasParcelasActions.atualizarParcelasTaxasParcelasSucesso({ parcelas, afterSalvar: action.afterSalvar });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(TaxasParcelasActions.atualizarParcelasTaxasParcelasErro());
                })
            );
        })
    ));

    atualizarParcelasTaxasParcelasSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(TaxasParcelasActions.atualizarParcelasTaxasParcelasSucesso),
        tap(action => action.afterSalvar())
    ), {dispatch: false});

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private servicoConsignacaoService: ServicoConsignacaoService) {
        super();
    }
}
