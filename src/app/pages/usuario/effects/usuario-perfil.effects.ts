import { BasePaginatorEffects } from '../../base.effects.paginator';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { UsuarioPerfilService } from '../../../services/usuario-perfil.service';
import * as UsuarioPerfilActions from '../actions/usuario-perfil.action';
import { selectUsuarioPerfilState, selectPerfisAtivos, selectPerfilAtivo } from '../selectors/usuario-perfil.selectors';
import { PageSort } from '../../../vo/page.sort';
import { UsuarioPerfil } from 'src/app/models/usuario-perfil';
import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsuarioPerfilEffects extends BasePaginatorEffects {

    countUsuarioPerfil$ = super.baseCreateCount(UsuarioPerfilActions.countUsuarioPerfil,
        UsuarioPerfilActions.countUsuarioPerfilSucesso, UsuarioPerfilActions.countUsuarioPerfilErro);

    countUsuarioPerfilSucesso$ = super.baseCreateCountSuccess(UsuarioPerfilActions.countUsuarioPerfilSucesso);

    pesquisarUsuarioPefrfil$ = super.baseCreateFind(UsuarioPerfilActions.pesquisarUsuarioPerfil, selectUsuarioPerfilState,
        UsuarioPerfilActions.pesquisarUsuarioPerfilSucesso, UsuarioPerfilActions.pesquisarUsuarioPerfilErro);

    salvarUsuarioPerfil = super.baseCreateSave(UsuarioPerfilActions.salvarUsuarioPerfil,
        UsuarioPerfilActions.salvarUsuarioPerfilSucesso);

    atualizarStatus$ = super.baseCreateUpdateStatus(UsuarioPerfilActions.atualizarStatusUsuarioPerfil,
        UsuarioPerfilActions.atualizarStatusUsuarioPerfilSucesso);

    carregarDependenciasUsuarioPerfil$ = createEffect(() => this.actions$.pipe(
        ofType(UsuarioPerfilActions.carregarDependenciasUsuarioPerfilParaSalvar),
        mergeMap((action) =>
            of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectPerfilAtivo(action.registro.perfil.id)))
                )
            )
        ),
        switchMap(([action, perfil]) => {
            const registro = Object.assign({ }, action.registro);
            registro.perfil = perfil;
            return of(UsuarioPerfilActions.salvarUsuarioPerfil({ registro, afterSave: action.afterSave }));
        })
    ));

    recuperarPerfisAtivos$ = createEffect(() => this.actions$.pipe(
        ofType(UsuarioPerfilActions.recuperarPerfisAtivos),
        withLatestFrom(this.store.pipe(select(selectPerfisAtivos))),
        mergeMap(([action, perfisState]) => {

            return this.usuarioPerfilService.recuperarPerfisNaoVinculados(action.idUsuario).pipe(
                map(perfis => UsuarioPerfilActions.recuperarPerfisAtivosSucesso({ perfis })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );

        })
    ));

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private usuarioPerfilService: UsuarioPerfilService) {
        super(actions$, store);
    }

    countRegistros(filtro: UsuarioPerfil) {
        return this.usuarioPerfilService.count(filtro);
    }
    findRegistros(pageSort: PageSort<UsuarioPerfil>) {
        return this.usuarioPerfilService.pesquisar(pageSort);
    }
    saveRegistro(registro: UsuarioPerfil) {
        return this.usuarioPerfilService.salvar(registro);
    }
    updateStatus(registro: UsuarioPerfil) {
        return this.usuarioPerfilService.atualizarStatus(registro);
    }
}
