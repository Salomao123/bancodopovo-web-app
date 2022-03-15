import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ParticipantesState } from '../reducers/participantes.reducers';
import * as fromParticipanteReducers from '../reducers/participantes.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { baseSelectFilter, baseSelectCount, baseSelectPageRegs, baseSelectPageShow, baseSelectPage } from '../../base.selectors';

export const selectParticipanteState = createFeatureSelector<ParticipantesState>('participantes');

export const selectAllParticipantes = createSelector(
    selectParticipanteState,
    fromParticipanteReducers.selectAll
);

export const selectParticipanteFiltro = baseSelectFilter(selectParticipanteState);

export const selectParticipanteCount = baseSelectCount(selectParticipanteState);

export const selectPageRegs = (page: PageQuery) => baseSelectPageRegs(selectParticipanteState, page);

export const selectParticipantesPageShow = baseSelectPageShow(selectParticipanteState);

export const selectParticipantesPage = (page: PageQuery, sort: SortMeta) => baseSelectPage(selectParticipanteState, page, sort);
