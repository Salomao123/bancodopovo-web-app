import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConsultaMargemState } from '../reducers/consulta-margem.reducers';

export const selectConsultaMargemState = createFeatureSelector<ConsultaMargemState>('margens');

export const selectMargem = createSelector(
    selectConsultaMargemState,
    state => state.margem
);

export const selectServicosConsignacao = createSelector(
    selectConsultaMargemState,
    state => state.servicos
);

export const selectServicoConsignacaoParaProposta = (id: number) => createSelector(
    selectServicosConsignacao,
    servicos => servicos.filter(s => s.id === id)
);
