import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmprestimoDetalheState } from '../reducers/emprestimo-detalhe.reducers';
import * as fromEmprestimoDetalheReducers from '../reducers/emprestimo-detalhe.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { baseSelectFilter, baseSelectCount, baseSelectPageRegs, baseSelectPageShow, baseSelectPage } from '../../base.selectors';
