import { Injectable } from '@angular/core';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import * as EnderecoActions from '../actions/endereco.action';
import { mergeMap, map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { EnderecoService } from '../../../services/endereco.service';
import { of } from 'rxjs';
import { selectUfCidades, selectUfs, selectEnderecoState } from '../selectors/endereco.selectors';
import { Uf } from '../../../models/uf';
import { PageSort } from '../../../vo/page.sort';
import { Endereco } from '../../../models/endereco';

@Injectable()
export class EnderecoEffects extends BasePaginatorEffects {

    countEndereco$ = super.baseCreateCount(EnderecoActions.countEndereco,
        EnderecoActions.countEnderecoSucesso, EnderecoActions.countEnderecoErro);

    countEnderecoSucesso$ = super.baseCreateCountSuccess(EnderecoActions.countEnderecoSucesso);

    pesquisarEndereco$ = super.baseCreateFind(EnderecoActions.pesquisarEndereco,
        selectEnderecoState, EnderecoActions.pesquisarEnderecoSucesso,
        EnderecoActions.pesquisarEnderecoErro);

    salvarEndereco$ = super.baseCreateSave(EnderecoActions.salvarEndereco,
        EnderecoActions.salvarEnderecoSucesso);

    atualizarStatusEndereco$ = super.baseCreateUpdateStatus(EnderecoActions.atualizarStatusEndereco,
        EnderecoActions.atualizarStatusEnderecoSucesso);

    recuperarUfs$ = createEffect(() => this.action$.pipe(
        ofType(EnderecoActions.listarUfEndereco),
        mergeMap((action) =>
            of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectUfs))
                )
            )
        ),
        switchMap(([action, ufsStore]) => {
            if (!ufsStore) {
                return this.enderecoService.recuperarUfs().pipe(
                    map(ufs => EnderecoActions.listarUfEnderecoSucesso({ ufs })),
                    catchError(err => {
                        super.addMessageError(err);
                        return of(EnderecoActions.listarUfEnderecoErro());
                    })
                );
            } else {
                return of(EnderecoActions.listarUfEnderecoSucesso({ ufs: (ufsStore as Uf[]) }));
            }
        })
    ));

    recuperarCidades$ = createEffect(() => this.action$.pipe(
        ofType(EnderecoActions.listarCidadeEndereco),
        mergeMap((action) =>
            of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectUfCidades(action.idUf)))
                )
            )
        ),
        switchMap(([action, ufCidade]) => {
            if (!ufCidade) {
                return this.enderecoService.recuperarCidades(action.idUf).pipe(
                    map(cidades => EnderecoActions.listarCidadeEnderecoSucesso({ idUf: action.idUf, cidades })),
                    catchError(err => {
                        super.addMessageError(err);
                        return of(EnderecoActions.listarCidadeEnderecoErro());
                    })
                );
            } else {
                return of(EnderecoActions.listarCidadeEnderecoSucesso(ufCidade));
            }
        })
    ));

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private enderecoService: EnderecoService) {
        super(action$, store);
    }

    countRegistros(filtro: any) {
        return this.enderecoService.count(filtro);
    }
    findRegistros(pageSort: PageSort<Endereco>) {
        return this.enderecoService.pesquisar(pageSort);
    }
    saveRegistro(registro: Endereco) {
        return this.enderecoService.salvar(registro);
    }
    updateStatus(registro: Endereco) {
        return this.enderecoService.atualizarStatus(registro);
    }

}
