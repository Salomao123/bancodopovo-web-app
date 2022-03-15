import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LevantamentosState } from '../reducers/levantamentos.reducers';
import * as fromLevantamentoReducers from '../reducers/levantamentos.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { baseSelectFilter, baseSelectCount, baseSelectPageRegs, baseSelectPageShow, baseSelectPage } from '../../base.selectors';

export const selectLevantamentoState = createFeatureSelector<LevantamentosState>('levantamentos');

export const selectAllLevantamentos = createSelector(
    selectLevantamentoState,
    fromLevantamentoReducers.selectAll
);

export const selectLevantamentoFiltro = baseSelectFilter(selectLevantamentoState);

export const selectLevantamentoCount = baseSelectCount(selectLevantamentoState);

export const selectPageRegs = (page: PageQuery) => baseSelectPageRegs(selectLevantamentoState, page);

export const selectLevantamentosPageShow = baseSelectPageShow(selectLevantamentoState);

export const selectLevantamentosPage = (page: PageQuery, sort: SortMeta) => baseSelectPage(selectLevantamentoState, page, sort);
