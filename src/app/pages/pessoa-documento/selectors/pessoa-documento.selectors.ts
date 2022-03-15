import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PessoaDocumentoState } from '../reducers/pessoa-documento.reducers';
import * as fromLevantamentoReducers from '../reducers/pessoa-documento.reducers';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { baseSelectFilter, baseSelectCount, baseSelectPageRegs, baseSelectPageShow, baseSelectPage } from '../../base.selectors';

export const selectPessoaDocumentoState = createFeatureSelector<PessoaDocumentoState>('documentos');

export const selectAllLevantamentos = createSelector(
    selectPessoaDocumentoState,
    fromLevantamentoReducers.selectAll
);

export const selectLevantamentoFiltro = baseSelectFilter(selectPessoaDocumentoState);

export const selectLevantamentoCount = baseSelectCount(selectPessoaDocumentoState);

export const selectPageRegs = (page: PageQuery) => baseSelectPageRegs(selectPessoaDocumentoState, page);

export const selectLevantamentosPageShow = baseSelectPageShow(selectPessoaDocumentoState);

export const selectLevantamentosPage = (page: PageQuery, sort: SortMeta) => baseSelectPage(selectPessoaDocumentoState, page, sort);

export const selectPessoasFisicas = createSelector(
    selectPessoaDocumentoState,
    state => state.pessoasFisicas
);

export const selectPessoaFisicaSelecionada = (idPessoa: number) => createSelector(
    selectPessoasFisicas,
    pessoas => {
        const pessoa = pessoas.filter(p => p.id === idPessoa);
        return (pessoa) ? pessoa[0] : undefined;
    }
);
