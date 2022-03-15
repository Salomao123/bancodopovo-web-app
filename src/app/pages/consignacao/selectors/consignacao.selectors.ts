import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConsignacaoState } from '../reducers/consignacao.reducers';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';

export const selectConsignacaoState = createFeatureSelector<ConsignacaoState>('consignacoes');

export const selectConsignacaoCount = baseSelectCount(selectConsignacaoState);

export const selectConsignacaoPageShow = baseSelectPageShow(selectConsignacaoState);

export const selectPropostaConsignacao = createSelector(
    selectConsignacaoState,
    state => state.proposta
);

export const selectConsignadosConsignacao = createSelector(
    selectConsignacaoState,
    state => state.consignados
);

export const selectConsignadoByMatricula = (matricula: string) => createSelector(
    selectConsignacaoState,
    state => {
        const consignado = state.consignados.filter(c => c.matricula === matricula);
        return (consignado && consignado.length > 0) ? consignado[0] : undefined;
    }
);
