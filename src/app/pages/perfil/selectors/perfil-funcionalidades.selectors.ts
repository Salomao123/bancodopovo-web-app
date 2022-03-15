import { PerfilFuncionalidadesState } from '../reducers/perfil-funcionalidades.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PageQuery, SortMeta } from '../../../util/pagination';

export const selectPerfilFuncionalidadesState = createFeatureSelector<PerfilFuncionalidadesState>('perfisFuncionalidades');

export const selectFuncionalidadesAtivas = createSelector(
    selectPerfilFuncionalidadesState,
    state => state.funcionalidades
);

export const selectAcoesNaoVinculadas = createSelector(
    selectPerfilFuncionalidadesState,
    state => (state.acoes) ? state.acoes : []
);

export const selectPerfilFuncionalidadeAcaoFiltro = createSelector(
    selectPerfilFuncionalidadesState,
    state => state.filter
);

export const selectPerfilFuncionalidadeAcaoCount = createSelector(
    selectPerfilFuncionalidadesState,
    state => state.count
);

export const selectPageRegs = (page: PageQuery) => createSelector(
    selectPerfilFuncionalidadesState,
    state => {
        const pageRequest = (page) ? page : state.page;
        const pageReg = state.pagesRegs.filter(pr => pr.page === pageRequest.first);
        return (pageReg.length > 0) ? pageReg[0] : undefined;
    }
);

export const selectPerfisFuncionalidadesAcoesPageShow = createSelector(
    selectPerfilFuncionalidadesState,
    selectPageRegs(undefined),
    (state, pageReg) => {
        return (pageReg) ? pageReg.registros.map(id => state.entities[id]) : [];
    }
);

export const selectPerfisFuncionalidadesAcoesPage = (page: PageQuery, sort: SortMeta) => createSelector(
    selectPerfilFuncionalidadesState,
    selectPageRegs(page),
    (state, pageReg) => {
        if ((state.sort) && sort.field === state.sort.field && sort.order === state.sort.order) {
            return (pageReg) ? pageReg.registros.map(id => state.entities[id]) : [];
        } else {
            return [];
        }
    }
);
