import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Parametro } from '../../../models/parametro';
import { createReducer, on, Action } from '@ngrx/store';
import * as ParametroActions from '../actions/parametros.actions';
import { ParametroBoleto } from '../../../models/parametro.boleto';
import { OpcoesParametroBoletoVo } from '../../../vo/opcoes-parametro-boleto.vo';

export interface ParametroState {
    parametro: Parametro;
    parametroBoleto: ParametroBoleto;
    opcoesBoleto: OpcoesParametroBoletoVo;
}

export const initialParametroState: ParametroState = {
    parametro: undefined,
    parametroBoleto: undefined,
    opcoesBoleto: undefined
};

const initParametroReducer = createReducer(
    initialParametroState,
    on(ParametroActions.recuperarParametrosSucesso, (state, {parametro}) => {
        return {...state, parametro};
    }),
    on(ParametroActions.recuperarParametrosErro, (state) => ({...initialParametroState})),
    on(ParametroActions.salvarParametrosSucesso, (state, {parametro}) => {
        return {...state, parametro};
    }),
    on(ParametroActions.recuperarParametrosBoletoSucesso, (state, {parametroBoleto, opcoesBoleto}) => {
        return {...state, parametroBoleto, opcoesBoleto};
    }),
    on(ParametroActions.salvarParametroBoletoSucesso, (state, {parametroBoleto}) => {
        return {...state, parametroBoleto};
    })
);

export function parametroReducer(state: ParametroState | undefined, action: Action) {
    return initParametroReducer(state, action);
}
