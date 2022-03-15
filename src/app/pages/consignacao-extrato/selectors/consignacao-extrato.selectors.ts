import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConsignacaoExtratoState } from '../reducers/consignacao-extrato.reducers';
import * as fromConsignacaoExtratoReducer from '../reducers/consignacao-extrato.reducers';

export const selectConsignacaoExtratoState = createFeatureSelector<ConsignacaoExtratoState>('consignacao-extrato');

export const selectConsignadosConsignacaoExtrato = createSelector(
    selectConsignacaoExtratoState,
    fromConsignacaoExtratoReducer.selectAll
);

export const selectPropostasConsignacaoExtrato = createSelector(
    selectConsignacaoExtratoState,
    state => (state.consignadoSelecionado) ? state.entities[state.consignadoSelecionado].propostas : undefined
);
