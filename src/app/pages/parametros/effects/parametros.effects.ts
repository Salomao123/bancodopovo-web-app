import { BaseEffects } from '../../base.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { ParametroService } from '../../../services/parametro.service';
import { Injectable } from '@angular/core';
import * as ParametroActions from '../actions/parametros.actions';
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { selectParametros, selectParametrosBoleto, selectOpcoesBoleto } from '../selectors/parametro.selectors';
import { ParametroBoletoService } from '../../../services/parametro-boleto.service';

@Injectable()
export class ParametrosEffect extends BaseEffects {

    recuperarParametro$ = createEffect(() => this.action$.pipe(
        ofType(ParametroActions.recuperarParametros),
        withLatestFrom(this.store.pipe(select(selectParametros))),
        mergeMap(([action, parametros]) => {
            if (parametros) {
                return of(ParametroActions.recuperarParametrosSucesso({ parametro: parametros }));
            }
            return this.parametroService.recuperar().pipe(
                map(parametro => ParametroActions.recuperarParametrosSucesso({ parametro })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ParametroActions.recuperarParametrosErro());
                })
            );
        })
    ));

    salvarParametro$ = createEffect(() => this.action$.pipe(
        ofType(ParametroActions.salvarParametros),
        mergeMap(action => {
            return this.parametroService.atualizar(action.parametro).pipe(
                map(() => {
                    super.addMessageSuccess('Parâmetros salvos com sucesso');
                    return ParametroActions.salvarParametrosSucesso({ parametro: action.parametro });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ParametroActions.salvarParametroErro());
                })
            );
        })
    ));

    recuperarParametrosBoleto$ = createEffect(() => this.action$.pipe(
        ofType(ParametroActions.recuperarParametrosBoleto),
        withLatestFrom(
            this.store.pipe(select(selectParametrosBoleto)),
            this.store.pipe(select(selectOpcoesBoleto))
        ),
        mergeMap(([action, parametroBoleto, opcoesBoleto]) => {
            if (parametroBoleto && opcoesBoleto) {
                return of(ParametroActions.recuperarParametrosBoletoSucesso(
                    { parametroBoleto, opcoesBoleto, after: action.after }));
            }
            return this.parametroBoletoService.recuperar().pipe(
                map(res => ParametroActions.recuperarParametrosBoletoSucesso(
                    { parametroBoleto: res.parametro, opcoesBoleto: res.opcoes, after: action.after })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ParametroActions.recuperarParametrosBoletoErro());
                })
            );
        })
    ));

    recuperarParametrosBoletoSucesso$ = createEffect(() => this.action$.pipe(
        ofType(ParametroActions.recuperarParametrosBoletoSucesso),
        tap(action => action.after())
    ), { dispatch: false });

    salvarParametroBoleto$ = createEffect(() => this.action$.pipe(
        ofType(ParametroActions.salvarParametroBoleto),
        mergeMap(action => {
            return this.parametroBoletoService.atualizar(action.parametroBoleto).pipe(
                map(parametroBoleto => {
                    super.addMessageSuccess('Parâmetros de Boleto salvos com sucesso');
                    return ParametroActions.salvarParametroBoletoSucesso(
                        { parametroBoleto, afterSave: action.afterSave });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ParametroActions.salvarParametroBoletoErro());
                })
            );
        })
    ));

    salvarParametroBoletoSucesso$ = createEffect(() => this.action$.pipe(
        ofType(ParametroActions.salvarParametroBoletoSucesso),
        tap(action => action.afterSave())
    ), { dispatch: false });

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private parametroService: ParametroService,
                private parametroBoletoService: ParametroBoletoService) {
        super();
    }

}
