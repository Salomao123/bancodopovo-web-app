import { BasePaginatorEffects } from '../../base.effects.paginator';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { PropostaService } from '../../../services/proposta.service';
import { Proposta } from '../../../models/proposta';
import { PageSort } from '../../../vo/page.sort';
import * as ConsignacaoActions from '../actions/consignacao.actions';
import { selectConsignacaoState } from '../selectors/consignacao.selectors';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export class ConsignacaoEffects extends BasePaginatorEffects {

    recuperarConsignadosPropostaConsignacao$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.recuperarConsignadosPropostaConsignacao),
        mergeMap(action => {
            return this.propostaService.recuperarConsignado(action.filter).pipe(
                map(consignados => ConsignacaoActions.recuperarConsignadosPropostaConsignacaoSucesso(
                    { consignados, afterConsulta: action.afterConsulta }))
            );
        })
    ));

    recuperarConsignadosPropostaConsignacaoSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.recuperarConsignadosPropostaConsignacaoSucesso),
        tap(action => {
            if (action.consignados && action.consignados.length > 0) {
                action.afterConsulta(action.consignados[0]);
            }
        })
    ), { dispatch: false });

    countConsignacao$ = super.baseCreateCount(ConsignacaoActions.countConsignacao,
        ConsignacaoActions.countConsignacaoSucesso, ConsignacaoActions.countConsignacaoErro);

    countConsignacaoSucesso$ = super.baseCreateCountSuccess(ConsignacaoActions.countConsignacaoSucesso);

    pesquisarConsignacao$ = super.baseCreateFind(ConsignacaoActions.pesquisarConsignacao,
        selectConsignacaoState, ConsignacaoActions.pesquisarConsignacaoSucesso,
        ConsignacaoActions.pesquisarConsignacaoErro);

    detalharPropostaConsignacao$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.detalharPropostaConsignacao),
        mergeMap(action => {
            return this.propostaService.recuperarPorId(action.id).pipe(
                map(proposta => ConsignacaoActions.detalharPropostaConsignacaoSucesso({ proposta, afterDetalhar: action.afterDetalhar })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ConsignacaoActions.detalharPropostaConsignacaoErro());
                })
            );
        })
    ));

    detalharPropostaConsignacaoSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.detalharPropostaConsignacaoSucesso),
        tap(action => action.afterDetalhar())
    ), { dispatch: false });

    salvarAlteracaoPropostaConsignacao$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.salvarAlteracaoPropostaConsignacao),
        mergeMap(action => {
            return this.propostaService.alterar(action.proposta).pipe(
                map(proposta => {
                    super.addMessageSuccess('Contrato alterado com sucesso.');
                    return ConsignacaoActions.salvarAlteracaoPropostaConsignacaoSucesso(
                                { proposta, afterSalvar: action.afterSalvar });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ConsignacaoActions.salvarAlteracaoPropostaConsignacaoErro());
                })
            );
        })
    ));

    salvarAlteracaoPropostaConsignacaoSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.salvarAlteracaoPropostaConsignacaoSucesso),
        tap(action => action.afterSalvar())
    ), { dispatch: false });

    salvarEncerramentoPropostaConsignacao$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.salvarEncerramentoPropostaConsignacao),
        mergeMap(action => {
            return this.propostaService.encerrar(action.id, action.file).pipe(
                map(() => {
                    super.addMessageSuccess('Contrato encerrado com sucesso.');
                    return ConsignacaoActions.salvarEncerramentoPropostaConsignacaoSucesso(
                        { id: action.id, afterSalvar: action.afterSalvar });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ConsignacaoActions.salvarEncerramentoPropostaConsignacaoErro());
                })
            );
        })
    ));

    salvarEncerramentoPropostaConsignacaoSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.salvarEncerramentoPropostaConsignacaoSucesso),
        tap(action => action.afterSalvar())
    ), { dispatch: false });

    salvarRenovacaoPropostaConsignacao$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.salvarRenovacaoPropostaConsignacao),
        mergeMap(action => {
            return this.propostaService.renovar(action.propostaRenovacaoVo, action.file).pipe(
                map(proposta => {
                    super.addMessageSuccess('Contratos renovados com sucesso.');
                    return ConsignacaoActions.salvarRenovacaoPropostaConsignacaoSucesso(
                        { proposta,
                            idsPropostasRenovadas: action.propostaRenovacaoVo.idsPropostasRenegociadas,
                            afterSalvar: action.afterSalvar
                        });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ConsignacaoActions.salvarRenovacaoPropostaConsignacaoErro());
                })
            );
        })
    ));

    salvarRenovacaoPropostaConsignacaoSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.salvarRenovacaoPropostaConsignacaoSucesso),
        tap(action => action.afterSalvar())
    ), { dispatch: false });

    salvarSuspensaoPropostaConsignacao$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.salvarSuspensaoPropostaConsignacao),
        mergeMap(action => {
            return this.propostaService.suspender(action.proposta, action.file).pipe(
                map(() => {
                    super.addMessageSuccess('Contrato suspenso com sucesso.');
                    return ConsignacaoActions.salvarSuspensaoPropostaConsignacaoSucesso(
                        { id: action.proposta.id, afterSalvar: action.afterSalvar });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ConsignacaoActions.salvarSuspensaoPropostaConsignacaoErro());
                })
            );
        })
    ));

    salvarSuspensaoPropostaConsignacaoSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.salvarSuspensaoPropostaConsignacaoSucesso),
        tap(action => action.afterSalvar())
    ), { dispatch: false });

    salvarCancelamentoSuspensaoPropostaConsignacao$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.salvarCancelamentoSuspensaoPropostaConsignacao),
        mergeMap(action => {
            return this.propostaService.cancelarSuspensao(action.proposta, action.file).pipe(
                map(() => {
                    super.addMessageSuccess('Suspensão de contrato cancelada com sucesso.');
                    return ConsignacaoActions.salvarCancelamentoSuspensaoPropostaConsignacaoSucesso(
                        { id: action.proposta.id, afterSalvar: action.afterSalvar });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ConsignacaoActions.salvarCancelamentoSuspensaoPropostaConsignacaoErro());
                })
            );
        })
    ));

    salvarCancelamentoSuspensaoPropostaConsignacaoSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(ConsignacaoActions.salvarCancelamentoSuspensaoPropostaConsignacaoSucesso),
        tap(action => action.afterSalvar())
    ), { dispatch: false });

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private propostaService: PropostaService) {
        super(actions$, store);
    }

    countRegistros(filtro: Proposta) {
        return this.propostaService.count(filtro);
    }
    findRegistros(pageSort: PageSort<Proposta>) {
        return this.propostaService.pesquisar(pageSort);
    }
    saveRegistro(registro: any) {
        throw new Error('Method not implemented.');
    }
    updateStatus(registro: any) {
        throw new Error('Method not implemented.');
    }
}
