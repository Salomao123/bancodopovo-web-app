import { BasePaginatorEffects } from '../../base.effects.paginator';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { UsuarioService } from '../../../services/usuario.service';
import { PageSort } from '../../../vo/page.sort';
import { Usuario } from '../../../models/usuario';
import * as UsuarioActions from '../actions/usuario.action';
import { selectUsuarioState, selectEmpresas, selectEmpresasConsignatarias, selectEmpregados, selectPessoaSelecionada, selectEmpresaSelecionada, selectEmpregadoConsignanteSelecionado, selectEmpresaConsignatariaSelecionada } from '../selectors/usuario.selectors';
import { mergeMap, map, catchError, withLatestFrom, switchMap, tap } from 'rxjs/operators';
import { PessoaService } from '../../../services/pessoa.service';
import { TipoPessoaEnum } from 'src/app/enums/tipo.pessoa';
import { StatusRegistroEnum } from 'src/app/enums/status.registro';
import { EmpresaService } from '../../../services/empresa.service';
import { of } from 'rxjs';
import { EmpresaConsignatariaService } from '../../../services/empresa-consignataria.service';
import { EmpregadoConsignanteService } from '../../../services/empregado-consignante.service';

@Injectable()
export class UsuarioEffects extends BasePaginatorEffects {

    countUsuario$ = super.baseCreateCount(UsuarioActions.countUsuario, UsuarioActions.countUsuarioSucesso, UsuarioActions.countUsuarioErro);

    countUsuarioSucesso$ = super.baseCreateCountSuccess(UsuarioActions.countUsuarioSucesso);

    pesquisarUsuario$ = super.baseCreateFind(UsuarioActions.pesquisarUsuario, selectUsuarioState,
        UsuarioActions.pesquisarUsuarioSucesso, UsuarioActions.pesquisarUsuarioErro);

    salvarUsuario$ = super.baseCreateSave(UsuarioActions.salvarUsuario, UsuarioActions.salvarUsuarioSucesso);

    atualizarStatus = super.baseCreateUpdateStatus(UsuarioActions.atualizarStatusUsuario, UsuarioActions.atualizarStatusUsuarioSucesso);

    carregarDependenciasParaSalvar$ = createEffect(() => this.action$.pipe(
        ofType(UsuarioActions.carregarDependenciasParaSalvarUsuario),
        mergeMap((action) =>
            of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectPessoaSelecionada(action.registro.pessoa))),
                    this.store.pipe(select(selectEmpresaSelecionada(action.registro.empresa))),
                    this.store.pipe(select(selectEmpregadoConsignanteSelecionado(action.registro.empregadoConsignante))),
                    this.store.pipe(select(selectEmpresaConsignatariaSelecionada(action.registro.empresaConsignataria)))
                )
            )),
        switchMap(([action, pessoaState, empresaState, empregadoState, empresaConsignatariaState]) => {
            const usuario = Object.assign({}, action.registro);

            usuario.pessoa = pessoaState;
            usuario.empresa = empresaState;
            usuario.empregadoConsignante = empregadoState;
            usuario.empresaConsignataria = empresaConsignatariaState;

            return of(UsuarioActions.salvarUsuario({ registro: usuario, afterSave: action.afterSave }));
        })
    ));

    consultarPessoasFisicas$ = createEffect(() => this.action$.pipe(
        ofType(UsuarioActions.consultarPessoasFisicas),
        mergeMap(() => {
            return this.pessoaService.recuperarPorTipoStatus(TipoPessoaEnum.FISICA, StatusRegistroEnum.ATIVO).pipe(
                map(pessoasFisicas => UsuarioActions.consultarPessoasFisicasSucesso({ pessoasFisicas })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    consultarEmpresas$ = createEffect(() => this.action$.pipe(
        ofType(UsuarioActions.consultarEmpresas),
        withLatestFrom(this.store.pipe(select(selectEmpresas))),
        mergeMap(([action, empresasState]) => {
            if ((!empresasState) || empresasState.length === 0) {
                return this.empresaService.recuperarPorStatus(StatusRegistroEnum.ATIVO).pipe(
                    map(empresas => UsuarioActions.consultarEmpresasSucesso({ empresas })),
                    catchError(err => {
                        super.addMessageError(err);
                        throw err;
                    })
                );
            } else {
                return of(UsuarioActions.consultarEmpresasSucesso({ empresas: empresasState }));
            }
        })
    ));

    consultarEmpresasConsignatarias$ = createEffect(() => this.action$.pipe(
        ofType(UsuarioActions.consultarEmpresasConsignatarias),
        withLatestFrom(this.store.pipe(select(selectEmpresasConsignatarias))),
        mergeMap(([action, empresasConsignatariasState]) => {
            if ((!empresasConsignatariasState) || empresasConsignatariasState.length === 0) {
                return this.empresaConsignatariaService.recuperarPorStatus(StatusRegistroEnum.ATIVO).pipe(
                    map(empresasConsignatarias => UsuarioActions.consultarEmpresasConsignatariasSucesso({ empresasConsignatarias })),
                    catchError(err => {
                        this.addMessageError(err);
                        throw err;
                    })
                );
            } else {
                return of(UsuarioActions.consultarEmpresasConsignatariasSucesso({ empresasConsignatarias: empresasConsignatariasState }));
            }
        })
    ));

    consultarEmpregados$ = createEffect(() => this.action$.pipe(
        ofType(UsuarioActions.consultarEmpregadosConsignantes),
        map(action => action.idEmpresa),
        mergeMap(idEmpresa => 
            of(idEmpresa).pipe(
                withLatestFrom(this.store.pipe(select(selectEmpregados(idEmpresa))))
            )
        ),
        switchMap(([idEmpresa, empregadosState]) => {
            if (!empregadosState) {
                return this.empregadoConsignanteService.recuperarPorEmpresa(idEmpresa).pipe(
                    map(empregados => UsuarioActions.consultarEmpregadosConsignantesSucesso({ idEmpresa, empregados })),
                    catchError(err => {
                        super.addMessageError(err);
                        throw err;
                    })
                );
            } else {
                return of(UsuarioActions.consultarEmpregadosConsignantesSucesso({ idEmpresa, empregados: empregadosState }));
            }
        })
    ));

    recuperarPorId$ = createEffect(() => this.action$.pipe(
        ofType(UsuarioActions.recuperarPorIdUsuario),
        mergeMap((action) => {
            return this.usuarioService.recuperarPorId(action.id).pipe(
                map(usuario => UsuarioActions.recuperarPorIdUsuarioSucesso({ usuario, afterConsulta: action.afterConsulta })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    recuperarPorIdSucesso$ = createEffect(() => this.action$.pipe(
        ofType(UsuarioActions.recuperarPorIdUsuarioSucesso),
        tap(action => action.afterConsulta(action.usuario))
    ), { dispatch: false });

    enviarEmailCadastro$ = createEffect(() => this.action$.pipe(
        ofType(UsuarioActions.enviarEmailCadastro),
        tap(action => {
            const usuario = new Usuario();
            usuario.id = action.idUsuario;
            return this.usuarioService.emailCadastro(usuario).subscribe(
                res => super.addMessageSuccess('E-mail enviado com sucesso.'),
                error => super.addMessageError(error)
            );
        })
    ), { dispatch: false });

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private usuarioService: UsuarioService,
                private pessoaService: PessoaService,
                private empresaService: EmpresaService,
                private empresaConsignatariaService: EmpresaConsignatariaService,
                private empregadoConsignanteService: EmpregadoConsignanteService) {
        super(action$, store);
    }

    countRegistros(filtro: Usuario) {
        return this.usuarioService.count(filtro);
    }
    findRegistros(pageSort: PageSort<Usuario>) {
        return this.usuarioService.pesquisar(pageSort);
    }
    saveRegistro(registro: Usuario) {
        return this.usuarioService.salvar(registro);
    }
    updateStatus(registro: Usuario) {
        return this.usuarioService.atualizarStatus(registro);
    }
}