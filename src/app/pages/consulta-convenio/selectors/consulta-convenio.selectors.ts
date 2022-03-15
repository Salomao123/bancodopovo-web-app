import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConsultaConvenioState } from '../reducers/consulta-convenio.reducers';

export const selectConsultaConvenioState = createFeatureSelector<ConsultaConvenioState>('consulta-convenios');

export const selectConvenioConsulta = createSelector(
    selectConsultaConvenioState,
    state => state.convenio
);
