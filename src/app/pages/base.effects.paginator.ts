import { StatusRegistroEnum } from './../enums/status.registro';
import { StatusEventoEnum } from './../enums/status.evento';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { BaseEffects } from './base.effects';
import { Observable, of } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { map, catchError, tap, switchMap, mergeMap, withLatestFrom } from 'rxjs/operators';
import { baseSelectPage, baseSelectFilter } from './base.selectors';
import { AppState } from '../reducers/index';
import { PageSort } from '../vo/page.sort';

export abstract class BasePaginatorEffects extends BaseEffects {
    constructor(private baseActions: Actions,
                private baseStore: Store<AppState>) {
        super();
    }

    baseCreateCount(typeAction: any, countSuccess: any, countError: any) {
        return createEffect(() => this.baseActions.pipe(
                ofType(typeAction),
                mergeMap(action => {
                    return this.countRegistros((action as any).filter).pipe(
                        map((count: number) => {
                            if (count === 0) {
                                super.addMessageWarning('Nenhum registro encontrado');
                            }
                            return countSuccess({ filter: (action as any).filter, count, afterCount: (action as any).afterCount });
                        }),
                        catchError(err => {
                            super.addMessageError(err);
                            return of(countError());
                        })
                    ) as Observable<Action>;
                })
        ));
    }

    baseCreateCountSuccess(typeAction: any) {
        return createEffect(() => this.baseActions.pipe(
            ofType(typeAction),
            tap(action => (action as any).afterCount())
        ), { dispatch: false });
    }

    baseCreateFind(typeAction: any, selectState: any, findServiceSuccess: any, findServiceError: any) {
        return createEffect(() => this.baseActions.pipe(
                ofType(typeAction),
                map(action => {
                    return {
                        page: (action as any).page,
                        sort: (action as any).sort
                    };
                }),
                mergeMap((pageSort) =>
                    of(pageSort).pipe(
                        withLatestFrom(
                            this.baseStore.pipe(select(baseSelectPage(selectState, pageSort.page, pageSort.sort))),
                            this.baseStore.pipe(select(baseSelectFilter(selectState)))
                        )
                    )
                ),
                switchMap(([pageSort, regsPage, filter]) => {
                    if (regsPage.length === 0) {
                        return this.findRegistros(super.getPageSort(filter, pageSort.page, pageSort.sort)).pipe(
                            map(registros => {
                                return findServiceSuccess({ registros, page: pageSort.page, sort: pageSort.sort });
                            }),
                            catchError(err => {
                                super.addMessageError(err);
                                return of(findServiceError({}));
                            })
                        ) as Observable<Action>;
                    } else {
                        return of(findServiceSuccess({ registros: regsPage, page: pageSort.page, sort: pageSort.sort }));
                    }
                })
            ));
    }

    baseCreateSave(typeAction: any, saveSuccess: any) {
        return createEffect(() => this.baseActions.pipe(
            ofType(typeAction),
            mergeMap((action) => {

                const insert: boolean = ((action as any).registro.id === undefined);

                return this.saveRegistro((action as any).registro).pipe(
                    map((registro) => {
                        (action as any).afterSave();
                        super.addMessageSuccess('Registro salvo com sucesso!');
                        return saveSuccess({ registro, insert });
                    }),
                    catchError(err => {
                        super.addMessageError(err);
                        throw err;
                    })
                ) as Observable<Action>;
            })
        ));
    }

    baseCreateSaveMethod(typeAction: any, saveSuccess: any, method: (registro: any) => any) {
        return createEffect(() => this.baseActions.pipe(
            ofType(typeAction),
            mergeMap((action) => {

                const insert: boolean = ((action as any).registro.id === undefined);

                return method((action as any).registro).pipe(
                    map((registro) => {
                        (action as any).afterSave();
                        super.addMessageSuccess('Registro salvo com sucesso!');
                        return saveSuccess({ registro, insert });
                    }),
                    catchError(err => {
                        super.addMessageError(err);
                        throw err;
                    })
                ) as Observable<Action>;
            })
        ));
    }

    baseCreateUpdateStatus(typeAction: any, updateStatusSuccess: any) {
        return createEffect(() => this.baseActions.pipe(
            ofType(typeAction),
            mergeMap((action) => {
                const registro = {
                    id: action.id,
                    status: action.status
                };

                return this.updateStatus(registro).pipe(
                    map(res => {
                        super.addMessageSuccess(
                            `Registro ${(action.status === StatusRegistroEnum.ATIVO) ? 'ativado' : 'inativado'} com sucesso.`);
                        return updateStatusSuccess({ id: action.id, status: action.status });
                    }),
                    catchError(err => {
                        super.addMessageError(err);
                        throw err;
                    })
                ) as Observable<Action>;
            })
        ));
    }

    baseCreateUpdateStatusEvento(typeAction: any, updateStatusSuccess: any) {
        return createEffect(() => this.baseActions.pipe(
            ofType(typeAction),
            mergeMap((action) => {
                const registro = {
                    id: action.id,
                    status: action.status
                };

                return this.updateStatus(registro).pipe(
                    map(res => {
                        super.addMessageSuccess(
                            `Evento ${(action.status === StatusEventoEnum.REALIZADO) ? 'marcado como realizado' : 'cancelado'} com sucesso.`);
                        return updateStatusSuccess({ id: action.id, status: action.status });
                    }),
                    catchError(err => {
                        super.addMessageError(err);
                        throw err;
                    })
                ) as Observable<Action>;
            })
        ));
    }

    abstract countRegistros(filtro: any);

    abstract findRegistros(pageSort: PageSort<any>);

    abstract saveRegistro(registro: any);

    abstract updateStatus(registro: any);
}

// export const baseCreateCountSuccess = (action$: Actions, typeAction: any) => createEffect(() => action$.pipe(
//     ofType(typeAction),
//     tap(action => (action as any).afterCount())
// ), {dispatch: false});
