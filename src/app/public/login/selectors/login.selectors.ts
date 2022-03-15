import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../reducers/login.reducers';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectUsuarioLogado = createSelector(
    selectLoginState,
    state => state.usuario
);

export const selectIsLoggedIn = createSelector(
    selectLoginState,
    state => state.loggedIn
);

export const selectHasAccess = (f: number) => createSelector(
    selectLoginState,
    state => {
        if (!!f) {
            return state.fs.filter((func: any) => func.f === f).length > 0;
        }

        return true;
    }
)

export const selectExistFuncionalidade = (f: number) => createSelector(
    selectLoginState,
    state => {
        if (state.fs) {
            return state.fs.filter((func: any) => func.f === f).length > 0;
        }

        return false;
    }
);

export const selectExistFuncionalidadeAcao = (f: number, a: number) => createSelector(
    selectLoginState,
    state => {
        if (state.fs) {
            const funcionalidade = state.fs.filter((func: any) => func.f === f);

            if (funcionalidade.length > 0) {
                return funcionalidade[0].as.filter((at: any) => at === a).length > 0;
            }
        }

        return false;
    }
);

export const selectTipoLogin = createSelector(
    selectLoginState,
    state => state.tipo
);

export const selectFuncionalidadeAtiva = createSelector(
    selectLoginState,
    state => ({ id: state.factive, name: state.fname })
);
