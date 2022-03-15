import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PessoaState } from '../reducers/pessoa.reducers';
import * as fromPessoaReducers from '../reducers/pessoa.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { baseSelectFilter, baseSelectCount, baseSelectPageRegs, baseSelectPageShow, baseSelectPage } from '../../base.selectors';

export const selectPessoaState = createFeatureSelector<PessoaState>('pessoas');

export const selectAllPessoas = createSelector(
    selectPessoaState,
    fromPessoaReducers.selectAll
);

export const selectPessoaFiltro = baseSelectFilter(selectPessoaState);

export const selectPessoaCount = baseSelectCount(selectPessoaState);

export const selectPageRegs = (page: PageQuery) => baseSelectPageRegs(selectPessoaState, page);

export const selectPessoasPageShow = baseSelectPageShow(selectPessoaState);

export const selectPessoasPage = (page: PageQuery, sort: SortMeta) => baseSelectPage(selectPessoaState, page, sort);
