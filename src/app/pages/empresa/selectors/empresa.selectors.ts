import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmpresaState } from '../reducers/empresa.reducers';
import * as fromEmpresaReducers from '../reducers/empresa.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';

export const selectEmpresaState = createFeatureSelector<EmpresaState>('empresas');

export const selectAllEmpresas = createSelector(
    selectEmpresaState,
    fromEmpresaReducers.selectAll
);

export const selectEmpresaFiltro = createSelector(
    selectEmpresaState,
    state => state.filter
);

export const selectEmpresaCount = createSelector(
    selectEmpresaState,
    state => state.count
);

export const selectPageRegs = (page: PageQuery) => createSelector(
    selectEmpresaState,
    state => {
        const pageRequest = (page) ? page : state.page;
        const pageReg = state.pagesRegs.filter(pr => pr.page === pageRequest.first);
        return (pageReg.length > 0) ? pageReg[0] : undefined;
    }
);

export const selectEmpresasPageShow = createSelector(
    selectEmpresaState,
    selectPageRegs(undefined),
    (state, pageReg) => {
        return (pageReg) ? pageReg.registros.map(id => state.entities[id]) : [];
    }
);

export const selectEmpresasPage = (page: PageQuery, sort: SortMeta) => createSelector(
    selectEmpresaState,
    selectPageRegs(page),
    (state, pageReg) => {
        if ((state.sort) && sort.field === state.sort.field && sort.order === state.sort.order) {
            return (pageReg) ? pageReg.registros.map(id => state.entities[id]) : [];
        } else {
            return [];
        }
    }
);

export const selectPessoasJuridicas = createSelector(
    selectEmpresaState,
    state => state.pessoasJuridicas
);
