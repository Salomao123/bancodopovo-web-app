import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LinhasCreditoState } from '../reducers/linhas-credito.reducers';
import * as fromLinhaCreditoReducers from '../reducers/linhas-credito.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { baseSelectFilter, baseSelectCount, baseSelectPageRegs, baseSelectPageShow, baseSelectPage } from '../../base.selectors';

export const selectLinhasCreditoState = createFeatureSelector<LinhasCreditoState>('linhas-credito');

export const selectAllLinhasCredito = createSelector(
    selectLinhasCreditoState,
    fromLinhaCreditoReducers.selectAll
);

export const selectLinhaCreditoFiltro = baseSelectFilter(selectLinhasCreditoState);

export const selectLinhaCreditoCount = baseSelectCount(selectLinhasCreditoState);

export const selectPageRegs = (page: PageQuery) => baseSelectPageRegs(selectLinhasCreditoState, page);

export const selectLinhaCreditoPageShow = baseSelectPageShow(selectLinhasCreditoState);

export const selectLinhaCreditoModal = baseSelectPageShow(selectLinhasCreditoState);

export const selectLinhaCreditoPage = (page: PageQuery, sort: SortMeta) => baseSelectPage(selectLinhasCreditoState, page, sort);
