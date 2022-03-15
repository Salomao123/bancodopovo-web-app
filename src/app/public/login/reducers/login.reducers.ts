import { Usuario } from '../../../models/usuario';
import { createReducer, on, Action } from '@ngrx/store';
import * as LoginActions from '../actions/login.actions';
import { TipoUsuarioEnum } from '../../../enums/tipo.usuario';

export interface LoginState {
    usuario: Usuario;
    loggedIn: boolean;
    fs: any;
    factive: number;
    fname: string;

    tipo: TipoUsuarioEnum;
}

export const initialLoginState: LoginState = {
    loggedIn: false,
    usuario: undefined,
    fs: undefined,
    factive: undefined,
    fname: undefined,

    tipo: undefined
};

const initLoginReducer = createReducer(
    initialLoginState,
    on(LoginActions.efetuarLoginSuccessAction, (state, {usuario, fs}) => {
        return {...state, usuario, loggedIn: true, fs};
    }),
    on(LoginActions.carregarDadosLoginSuccessAction, (state, {usuario, fs}) => {
        return {...state, usuario, loggedIn: true, fs};
    }),
    on(LoginActions.efetuarLogoutSuccessAction, (state) => {
        return {...initialLoginState};
    }),
    on(LoginActions.esqueciSenhaAction, (state, {tipo}) => {
        return {...state, tipo};
    }),
    on(LoginActions.selecionarFuncionalidadeAction, (state, {factive, fname}) => {
        return {...state, factive, fname};
    })
);

export function loginReducer(state: LoginState | undefined, action: Action) {
    return initLoginReducer(state, action);
}
