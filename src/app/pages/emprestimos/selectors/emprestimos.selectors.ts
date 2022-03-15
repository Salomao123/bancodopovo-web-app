import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmprestimosState } from '../reducers/emprestimos.reducers';
import * as fromEmprestimoReducers from '../reducers/emprestimos.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { baseSelectFilter, baseSelectCount, baseSelectPageRegs, baseSelectPageShow, baseSelectPage } from '../../base.selectors';

export const selectEmprestimoState = createFeatureSelector<EmprestimosState>('emprestimos');

export const selectAllEmprestimos = createSelector(
    selectEmprestimoState,
    fromEmprestimoReducers.selectAll
);

export const selectEmprestimoFiltro = baseSelectFilter(selectEmprestimoState);

export const selectEmprestimoCount = baseSelectCount(selectEmprestimoState);

export const selectPageRegs = (page: PageQuery) => baseSelectPageRegs(selectEmprestimoState, page);

export const selectEmprestimosPageShow = baseSelectPageShow(selectEmprestimoState);

export const selectEmprestimosPage = (page: PageQuery, sort: SortMeta) => baseSelectPage(selectEmprestimoState, page, sort);
