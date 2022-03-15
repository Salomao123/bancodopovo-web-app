import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LevantamentoNovoState } from '../reducers/levantamento-novo.reducers';
import * as fromLevantamentoReducers from '../reducers/levantamento-novo.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { baseSelectFilter, baseSelectCount, baseSelectPageRegs, baseSelectPageShow, baseSelectPage } from '../../base.selectors';

export const selectLevantamentoState = createFeatureSelector<LevantamentoNovoState>('levantamentos');

export const selectAllLevantamentos = createSelector(
    selectLevantamentoState,
    fromLevantamentoReducers.selectAll
);

export const selectLevantamentoFiltro = baseSelectFilter(selectLevantamentoState);

export const selectLevantamentoCount = baseSelectCount(selectLevantamentoState);

export const selectPageRegs = (page: PageQuery) => baseSelectPageRegs(selectLevantamentoState, page);

export const selectLevantamentosPageShow = baseSelectPageShow(selectLevantamentoState);

export const selectLevantamentosPage = (page: PageQuery, sort: SortMeta) => baseSelectPage(selectLevantamentoState, page, sort);
