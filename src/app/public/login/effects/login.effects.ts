import { AppState } from './../../../reducers/index';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as LoginActions from '../actions/login.actions';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { of, defer } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Store, select } from '@ngrx/store';
import { TipoUsuarioEnum } from 'src/app/enums/tipo.usuario';
import { selectUsuarioLogado, selectTipoLogin } from '../selectors/login.selectors';
import { BaseEffects } from '../../../pages/base.effects';
import { Usuario } from '../../../models/usuario';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable()
export class LoginEffects extends BaseEffects {

    @BlockUI() blockUI: NgBlockUI;

    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(
        ofType(LoginActions.efetuarLoginAction),
        map(action => {
            this.blockUI.start();
            this.loginService.login(action.usuarioLogin, action.tipoUsuario).subscribe(
                (res: any) => {
                    localStorage.setItem('cng_at', res.access_token);
                    localStorage.setItem('cng_rt', res.refresh_token);

                    console.log(res.fs);

                    this.usuarioService.recuperarDadosUsuario().subscribe(
                        resDados => {
                            this.store.dispatch(LoginActions.efetuarLoginSuccessAction({ usuario: resDados, fs: res.fs }));
                        },
                        error => {
                            this.store.dispatch(LoginActions.efetuarLoginErrorAction({ error }));
                        }
                    );
                },
                error => {
                    this.store.dispatch(LoginActions.efetuarLoginErrorAction({ error }));
                }
            );
        })
    );

    @Effect({ dispatch: false })
    loginError$ = this.actions$.pipe(
        ofType(LoginActions.efetuarLoginErrorAction),
        tap(action => {
            this.blockUI.stop();
            
            if (action.error.error.hasOwnProperty('error_description')) {
                const errorDesc = action.error.error.error_description;
                if (errorDesc === 'Bad credentials') {
                    super.addMessageError({error: {message: 'Usuário ou Senha inválidos!'}});
                } else {
                    super.addMessageError({error: {message: errorDesc}});
                }
            } else {
                super.addMessageError(action.error);
            }

        })
    );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType(LoginActions.efetuarLoginSuccessAction),
        map(action => {
            const jsonUser = JSON.stringify(action.usuario);
            const jsonFs = JSON.stringify(action.fs);

            localStorage.setItem('cng_user', jsonUser);
            localStorage.setItem('cng_fs', jsonFs);

            if (TipoUsuarioEnum.ADMINISTRADOR === action.usuario.tipo) {
                this.router.navigate(['/pages/home-admin']);
            } else if (TipoUsuarioEnum.CONSIGNANTE === action.usuario.tipo) {
                this.router.navigate(['/pages/home-consignante']);
            } else if (TipoUsuarioEnum.CONSIGNATARIO === action.usuario.tipo) {
                this.router.navigate(['/pages/home-consignatario']);
            }

            this.blockUI.stop();
        })
    );

    @Effect({ dispatch: false })
    carregarDadosNovoLogin$ = this.actions$.pipe(
        ofType(LoginActions.carregarDadosLoginSuccessAction),
        map(action => {
            const jsonUser = JSON.stringify(action.usuario);
            const jsonFs = JSON.stringify(action.fs);

            this.blockUI.stop();
        })
    );

    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType(LoginActions.efetuarLogoutAction),
        withLatestFrom(this.store.pipe(select(selectUsuarioLogado))),
        tap(([action, usuario]) => {
            this.removerDadosCookie();
            if (usuario && usuario.tipo) {
                this.routerLogin(usuario.tipo);
            } else {
                this.routerLogin(TipoUsuarioEnum.ADMINISTRADOR);
            }
            this.store.dispatch(LoginActions.efetuarLogoutSuccessAction());
        })
    );

    @Effect({dispatch: false})
    alterarSenha$ = this.actions$.pipe(
        ofType(LoginActions.alterarSenhaAction),
        tap(action => {
            this.blockUI.start();
            this.loginService.alterarSenha(action.novaSenhaVo).subscribe(
                res => {
                    this.blockUI.stop();
                    this.routerLogin(res);
                },
                err => {
                    this.blockUI.stop();
                    super.addMessageError(err);
                }
            );
        })
    );

    @Effect({dispatch: false})
    esqueciSenha$ = this.actions$.pipe(
        ofType(LoginActions.esqueciSenhaAction),
        tap(action => {
            this.router.navigate(['/esqueci-senha']);
        })
    );

    @Effect({dispatch: false})
    solicitarTrocaSenha$ = this.actions$.pipe(
        ofType(LoginActions.solicitarTrocaSenhaAction),
        withLatestFrom(this.store.pipe(select(selectTipoLogin))),
        tap(([action, tipo]) => {
            const usuario = new Usuario();
            usuario.login = action.email;
            usuario.tipo = tipo;

            this.blockUI.start();

            this.loginService.solicitarTrocaSenha(usuario).subscribe(
                res => {
                    this.blockUI.stop();
                    this.routerLogin(tipo);
                },
                err => {
                    this.blockUI.stop();
                    super.addMessageError(err);
                }
            );
        })
    );

    @Effect()
    init$ = defer(() => {
        if (this.isAccessTokenEnable() || this.isRefreshTokenEnable()) {
            const userData = localStorage.getItem('cng_user');
            const fs = localStorage.getItem('cng_fs');

            if (userData) {
                return of(LoginActions.carregarDadosLoginSuccessAction({ usuario: JSON.parse(userData), fs: JSON.parse(fs) }));
            }
        } else {
            this.removerDadosCookie();
        }
    });

    private removerDadosCookie() {
        localStorage.removeItem('cng_user');
        localStorage.removeItem('cng_fs');

        localStorage.removeItem('cng_at');
        localStorage.removeItem('cng_rt');
    }

    private isRefreshTokenEnable(): boolean {
        const refreshToken = localStorage.getItem('cng_rt');
        return !this.jwtHelper.isTokenExpired(refreshToken);
    }

    private isAccessTokenEnable(): boolean {
        const accessToken = localStorage.getItem('cng_at');
        return !this.jwtHelper.isTokenExpired(accessToken);
    }

    private routerLogin(tipo: number) {
        if (tipo === TipoUsuarioEnum.ADMINISTRADOR) {
            this.router.navigate(['/admin']);
        } else {
            this.router.navigate(['/orgao']);
        }
    }

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private router: Router,
                private jwtHelper: JwtHelperService,
                private loginService: LoginService,
                private usuarioService: UsuarioService) {
                    super();
                }

}
