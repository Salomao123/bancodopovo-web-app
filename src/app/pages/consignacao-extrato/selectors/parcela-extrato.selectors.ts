import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ParcelaExtratoState } from '../reducers/parcela-extrato.reducers';

export const selectParcelaExtratoState = createFeatureSelector<ParcelaExtratoState>('parcela-extrato');

export const selectParcelasPropostaParcelaExtrato = createSelector(
    selectParcelaExtratoState,
    state => {
        const propostaParcelaVo = (state.propostaSelecionada) ? state.entities[state.propostaSelecionada] : undefined;
        return (propostaParcelaVo) ? propostaParcelaVo.parcelas : undefined;
    }
);
