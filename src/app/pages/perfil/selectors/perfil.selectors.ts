import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PerfilState } from '../reducers/perfil.reducers';
import * as fromPerfilReducers from '../reducers/perfil.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';

export const selectPerfilState = createFeatureSelector<PerfilState>('perfis');

export const selectAllPerfis = createSelector(
    selectPerfilState,
    fromPerfilReducers.selectAll
);

export const selectPerfilFiltro = createSelector(
    selectPerfilState,
    state => state.filter
);

export const selectPerfilCount = createSelector(
    selectPerfilState,
    state => state.count
);

export const selectPageRegs = (page: PageQuery) => createSelector(
    selectPerfilState,
    state => {
        const pageRequest = (page) ? page : state.page;
        const pageReg = state.pagesRegs.filter(pr => pr.page === pageRequest.first);
        return (pageReg.length > 0) ? pageReg[0] : undefined;
    }
);

export const selectPerfisPageShow = createSelector(
    selectPerfilState,
    selectPageRegs(undefined),
    (state, pageReg) => {
        return (pageReg) ? pageReg.registros.map(id => state.entities[id]) : [];
    }
);

export const selectPerfisPage = (page: PageQuery, sort: SortMeta) => createSelector(
    selectPerfilState,
    selectPageRegs(page),
    (state, pageReg) => {
        if ((state.sort) && sort.field === state.sort.field && sort.order === state.sort.order) {
            return (pageReg) ? pageReg.registros.map(id => state.entities[id]) : [];
        } else {
            return [];
        }
    }
);
