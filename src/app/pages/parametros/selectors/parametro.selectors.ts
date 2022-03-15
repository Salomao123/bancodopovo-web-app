import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ParametroState } from '../reducers/parametros.reducers';

export const selectParametroState = createFeatureSelector<ParametroState>('parametros');

export const selectParametros = createSelector(
    selectParametroState,
    state => state.parametro
);

export const selectParametrosBoleto = createSelector(
    selectParametroState,
    state => state.parametroBoleto
);

export const selectOpcoesBoleto = createSelector(
    selectParametroState,
    state => state.opcoesBoleto
)
