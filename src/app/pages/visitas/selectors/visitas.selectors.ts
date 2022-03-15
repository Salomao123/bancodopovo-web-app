import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VisitasState } from '../reducers/visitas.reducers';
import * as fromVisitaReducers from '../reducers/visitas.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { baseSelectFilter, baseSelectCount, baseSelectPageRegs, baseSelectPageShow, baseSelectPage } from '../../base.selectors';

export const selectVisitaState = createFeatureSelector<VisitasState>('visitas');

export const selectAllVisitas = createSelector(
    selectVisitaState,
    fromVisitaReducers.selectAll
);

export const selectVisitaFiltro = baseSelectFilter(selectVisitaState);

export const selectVisitaCount = baseSelectCount(selectVisitaState);

export const selectPageRegs = (page: PageQuery) => baseSelectPageRegs(selectVisitaState, page);

export const selectVisitasPageShow = baseSelectPageShow(selectVisitaState);

export const selectVisitasPage = (page: PageQuery, sort: SortMeta) => baseSelectPage(selectVisitaState, page, sort);
