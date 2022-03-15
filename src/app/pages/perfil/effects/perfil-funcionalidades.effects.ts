import { Injectable } from '@angular/core';
import { BaseEffects } from '../../base.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import * as PerfilFuncionalidadesActions from '../actions/perfil-funcionalidades.action';
import { mergeMap, map, catchError, withLatestFrom, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FuncionalidadeService } from '../../../services/funcionalidade.service';
import { selectFuncionalidadesAtivas, selectPerfisFuncionalidadesAcoesPage, selectPerfilFuncionalidadeAcaoFiltro } from '../selectors/perfil-funcionalidades.selectors';
import { PerfilFuncionalidadeAcaoService } from '../../../services/perfil-funcionalidade-acao.service';
import { PerfilFuncionalidadeAcao } from '../../../models/perfil-funcionalidade-acao';

@Injectable()
export class PerfilFuncionalidadesEffects extends BaseEffects {

    recuperarFuncionalidadesAtivas$ = createEffect(() => this.action$.pipe(
        ofType(PerfilFuncionalidadesActions.recuperarFuncionalidadesAtivas),
        withLatestFrom(this.store.select(selectFuncionalidadesAtivas)),
        mergeMap(([action, funcionalidadesState]) => {
            if (funcionalidadesState) {
                return of(PerfilFuncionalidadesActions.recuperarFuncionalidadesAtivasSucesso({ funcionalidades: undefined }));
            } else {
                return this.funcionalidadeService.listarAtivas().pipe(
                    map(funcionalidades => PerfilFuncionalidadesActions.recuperarFuncionalidadesAtivasSucesso({ funcionalidades })),
                    catchError(err => {
                        super.addMessageError(err);
                        throw err;
                    })
                );
            }
        })
    ));

    recuperarAcoesNaoVinculadas$ = createEffect(() => this.action$.pipe(
        ofType(PerfilFuncionalidadesActions.recuperarAcoesNaoVinculadas),
        mergeMap(action => {
            return this.perfilFuncionalidadeAcaoService.recperarAcoesNaoVinculadas(action.idPerfil, action.idFuncionalidade).pipe(
                map(acoes => PerfilFuncionalidadesActions.recuperarAcoesNaoVinculadasSucesso({ acoes })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    countPerfil$ = createEffect(() => this.action$.pipe(
        ofType(PerfilFuncionalidadesActions.countPerfilFuncionalidadeAcao),
        mergeMap((action) => {
            return this.perfilFuncionalidadeAcaoService.count(action.filter).pipe(
                map((count: number) => {
                    return PerfilFuncionalidadesActions.countPerfilFuncionalidadeAcaoSucesso(
                        { filter: action.filter, count, afterCount: action.afterCount });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(PerfilFuncionalidadesActions.countPerfilFuncionalidadeAcaoErro());
                })
            );
        })
    ));

    countPerfilSucesso$ = createEffect(() => this.action$.pipe(
        ofType(PerfilFuncionalidadesActions.countPerfilFuncionalidadeAcaoSucesso),
        tap(action => action.afterCount())
    ), {dispatch: false});

    pesquisarPerfil$ = createEffect(() => this.action$.pipe(
        ofType(PerfilFuncionalidadesActions.pesquisarPerfilFuncionalidadeAcao),
        map((action) => {
            return {
                page: action.page,
                sort: action.sort
            };
        }),
        mergeMap((pageSort) =>
            of(pageSort).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectPerfisFuncionalidadesAcoesPage(pageSort.page, pageSort.sort))),
                    this.store.pipe(select(selectPerfilFuncionalidadeAcaoFiltro))
                )
            )
        ),
        switchMap(([pageSort, perfisFuncionalidadesAcoesPage, filtro]) => {
            if (perfisFuncionalidadesAcoesPage.length === 0) {
                return this.perfilFuncionalidadeAcaoService.pesquisar(this.getPageSort(filtro, pageSort.page, pageSort.sort)).pipe(
                    map((perfisFuncionalidadesAcoes: PerfilFuncionalidadeAcao[]) =>
                    PerfilFuncionalidadesActions.pesquisarPerfilFuncionalidadeAcaoSucesso(
                        { perfisFuncionalidadesAcoes, page: pageSort.page, sort: pageSort.sort })),
                    catchError(err => {
                        super.addMessageError(err);
                        return of(PerfilFuncionalidadesActions.pesquisarPerfilFuncionalidadeAcaoErro());
                    })
                );
            } else {
                return of(PerfilFuncionalidadesActions.pesquisarPerfilFuncionalidadeAcaoSucesso(
                    { perfisFuncionalidadesAcoes: perfisFuncionalidadesAcoesPage, page: pageSort.page, sort: pageSort.sort }));
            }
        })
    ));

    salvarPerfilFuncionalidadeAcao$ = createEffect(() => this.action$.pipe(
        ofType(PerfilFuncionalidadesActions.salvarPerfilFuncionalidadeAcao),
        mergeMap((action) => {
            return this.perfilFuncionalidadeAcaoService.salvar(action.perfis).pipe(
                map((perfis: PerfilFuncionalidadeAcao[]) => {
                    return PerfilFuncionalidadesActions.salvarPerfilFuncionalidadeAcaoSucesso({ perfis, afterSave: action.afterSave });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    salvarPerfilFuncionalidadeAcaoSucesso$ = createEffect(() => this.action$.pipe(
        ofType(PerfilFuncionalidadesActions.salvarPerfilFuncionalidadeAcaoSucesso),
        tap(action => action.afterSave())
    ), {dispatch: false});

    atualizarStatus$ = createEffect(() => this.action$.pipe(
        ofType(PerfilFuncionalidadesActions.atualizarStatusPerfilFuncionalidadeAcao),
        mergeMap((action) => {
            const perfil = new PerfilFuncionalidadeAcao();
            perfil.id = action.id;
            perfil.status = action.status;

            return this.perfilFuncionalidadeAcaoService.atualizarStatus(perfil).pipe(
                map(res => {
                    action.afterSave();
                    return PerfilFuncionalidadesActions.atualizarStatusPerfilFuncionalidadeAcaoSucesso(
                        { id: action.id, status: action.status });
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
                private perfilFuncionalidadeAcaoService: PerfilFuncionalidadeAcaoService,
                private funcionalidadeService: FuncionalidadeService) {
        super();
    }
}
