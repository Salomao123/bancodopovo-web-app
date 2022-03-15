import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConvenioState } from '../reducers/convenio.reducers';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';

export const selectConvenioState = createFeatureSelector<ConvenioState>('convenios');

export const selectConvenioCount = baseSelectCount(selectConvenioState);

export const selectConvenioPageShow = baseSelectPageShow(selectConvenioState);

export const selectEmpresasConsignatarias = createSelector(
    selectConvenioState,
    state => state.empresasConsignatarias
);

export const selectEmpresaConsignatariaSelecionada = (idEmpresaConsignataria: number) => createSelector(
    selectEmpresasConsignatarias,
    empresas => {
        const empresa = empresas.filter(p => p.id === idEmpresaConsignataria);
        return (empresa) ? empresa[0] : undefined;
    }
);
