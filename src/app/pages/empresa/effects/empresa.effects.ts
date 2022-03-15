import { Injectable } from '@angular/core';
import { BaseEffects } from '../../base.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { EmpresaService } from '../../../services/empresa.service';
import * as EmpresaActions from '../actions/empresa.actions';
import { mergeMap, catchError, map, withLatestFrom, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { selectEmpresaFiltro, selectEmpresasPage } from '../selectors/empresa.selectors';
import { Empresa } from '../../../models/empresa';
import { PessoaService } from '../../../services/pessoa.service';
import { TipoPessoaEnum } from 'src/app/enums/tipo.pessoa';
import { StatusRegistroEnum } from 'src/app/enums/status.registro';
import { pesquisarEmpresa } from '../actions/empresa.actions';

@Injectable()
export class EmpresaEffects extends BaseEffects {

    countEmpresa$ = createEffect(() => this.action$.pipe(
        ofType(EmpresaActions.countEmpresa),
        mergeMap((action) => {
            return this.empresaService.count(action.filter).pipe(
                map((count: number) => EmpresaActions.countEmpresaSucesso({ filter: action.filter, count, afterCount: action.afterCount })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(EmpresaActions.countEmpresaErro());
                })
            );
        })
    ));

    countEmpresaSucesso$ = createEffect(() => this.action$.pipe(
        ofType(EmpresaActions.countEmpresaSucesso),
        tap(action => action.afterCount())
    ), {dispatch: false});

    pesquisarEmpresa$ = createEffect(() => this.action$.pipe(
        ofType(EmpresaActions.pesquisarEmpresa),
        map(action => {
            return {
                page: action.page,
                sort: action.sort
            };
        }),
        mergeMap(pageSort =>
            of(pageSort).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectEmpresasPage(pageSort.page, pageSort.sort))),
                    this.store.pipe(select(selectEmpresaFiltro))
                )
            )
        ),
        switchMap(([pageSort, empresasPage, filtro]) => {
            if (empresasPage.length === 0) {
                return this.empresaService.pesquisar(this.getPageSort(filtro, pageSort.page, pageSort.sort)).pipe(
                    map((empresas: Empresa[]) => EmpresaActions.pesquisarEmpresaSucesso(
                        { empresas, page: pageSort.page, sort: pageSort.sort })),
                    catchError(err => {
                        super.addMessageError(err);
                        return of(EmpresaActions.pesquisarEmpresaErro());
                    })
                );
            } else {
                return of(EmpresaActions.pesquisarEmpresaSucesso({ empresas:  empresasPage, page: pageSort.page, sort: pageSort.sort }));
            }
        })
    ));

    salvarEmpresa$ = createEffect(() => this.action$.pipe(
        ofType(EmpresaActions.salvarEmpresa),
        mergeMap((action) => {

            const insert: boolean = (action.empresa.id === undefined);

            return this.empresaService.salvar(action.empresa).pipe(
                map((empresa: Empresa) => {
                    action.afterSave();
                    return EmpresaActions.salvarEmpresaSucesso({ empresa, insert });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    atualizarStatus$ = createEffect(() => this.action$.pipe(
        ofType(EmpresaActions.atualiarStatusEmpresa),
        mergeMap((action) => {
            const empresa = new Empresa();
            empresa.id = action.id;
            empresa.status = action.status;

            return this.empresaService.atualizarStatus(empresa).pipe(
                map(res => EmpresaActions.atualizarStatusEmpresaSucesso({ id: action.id, status: action.status })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    consultarPessoasJuridicas$ = createEffect(() => this.action$.pipe(
        ofType(EmpresaActions.consultarPessoasJuridicas),
        mergeMap((action) => {
            return this.pessoaService.recuperarPorTipoStatus(TipoPessoaEnum.JURIDICA, StatusRegistroEnum.ATIVO).pipe(
                map(pessoasJuridicas => EmpresaActions.consultarPessoasJuriticasSucesso({ pessoasJuridicas })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private empresaService: EmpresaService,
                private pessoaService: PessoaService) {
        super();
    }
}
