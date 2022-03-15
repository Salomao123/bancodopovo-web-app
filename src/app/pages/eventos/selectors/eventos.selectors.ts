import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EventosState } from '../reducers/eventos.reducers';
import * as fromEventoReducers from '../reducers/eventos.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { baseSelectFilter, baseSelectCount, baseSelectPageRegs, baseSelectPageShow, baseSelectPage } from '../../base.selectors';

export const selectEventoState = createFeatureSelector<EventosState>('eventos');

export const selectAllEventos = createSelector(
    selectEventoState,
    fromEventoReducers.selectAll
);

export const selectEventoFiltro = baseSelectFilter(selectEventoState);

export const selectEventoCount = baseSelectCount(selectEventoState);

export const selectPageRegs = (page: PageQuery) => baseSelectPageRegs(selectEventoState, page);

export const selectEventosPageShow = baseSelectPageShow(selectEventoState);

export const selectEventosPage = (page: PageQuery, sort: SortMeta) => baseSelectPage(selectEventoState, page, sort);
