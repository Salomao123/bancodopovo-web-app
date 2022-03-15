import { Injectable } from '@angular/core';
import { BaseEffects } from '../../base.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { PerfilService } from '../../../services/perfil.service';
import * as PerfilActions from '../actions/perfil.actions';
import { mergeMap, map, catchError, withLatestFrom, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { selectPerfisPage, selectPerfilFiltro } from '../selectors/perfil.selectors';
import { Perfil } from '../../../models/perfil';
import { FuncionalidadeService } from '../../../services/funcionalidade.service';

@Injectable()
export class PerfilEffects extends BaseEffects {

    countPerfil$ = createEffect(() => this.action$.pipe(
        ofType(PerfilActions.countPerfil),
        mergeMap((action) => {
            return this.perfilService.count(action.filter).pipe(
                map((count: number) => {
                    return PerfilActions.countPerfilSucesso({ filter: action.filter, count, afterCount: action.afterCount });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(PerfilActions.countPerfilErro());
                })
            );
        })
    ));

    countPerfilSucesso$ = createEffect(() => this.action$.pipe(
        ofType(PerfilActions.countPerfilSucesso),
        tap(action => action.afterCount())
    ), {dispatch: false});

    pesquisarPerfil$ = createEffect(() => this.action$.pipe(
        ofType(PerfilActions.pesquisarPerfil),
        map((action) => {
            return {
                page: action.page,
                sort: action.sort
            };
        }),
        mergeMap((pageSort) =>
            of(pageSort).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectPerfisPage(pageSort.page, pageSort.sort))),
                    this.store.pipe(select(selectPerfilFiltro))
                )
            )
        ),
        switchMap(([pageSort, perfisPage, filtro]) => {
            if (perfisPage.length === 0) {
                return this.perfilService.pesquisar(this.getPageSort(filtro, pageSort.page, pageSort.sort)).pipe(
                    map((perfis: Perfil[]) => PerfilActions.pesquisarPerfilSucesso({ perfis, page: pageSort.page, sort: pageSort.sort })),
                    catchError(err => {
                        super.addMessageError(err);
                        return of(PerfilActions.pesquisarPerfilErro());
                    })
                );
            } else {
                return of(PerfilActions.pesquisarPerfilSucesso({ perfis: perfisPage, page: pageSort.page, sort: pageSort.sort }));
            }
        })
    ));

    salvarPerfil$ = createEffect(() => this.action$.pipe(
        ofType(PerfilActions.salvarPerfil),
        mergeMap((action) => {

            const insert: boolean = (action.perfil.id === undefined);

            return this.perfilService.salvar(action.perfil).pipe(
                map((perfil: Perfil) => {
                    action.afterSave();
                    return PerfilActions.salvarPerfilSucesso({ perfil, insert });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    atualizarStatus$ = createEffect(() => this.action$.pipe(
        ofType(PerfilActions.atualiarStatusPerfil),
        mergeMap((action) => {
            const perfil = new Perfil();
            perfil.id = action.id;
            perfil.status = action.status;

            return this.perfilService.atualizarStatus(perfil).pipe(
                map(res => {
                    action.afterSave();
                    return PerfilActions.atualizarStatusPerfilSucesso({ id: action.id, status: action.status });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private perfilService: PerfilService,
                private funcionalidadeService: FuncionalidadeService) {
        super();
    }

}
