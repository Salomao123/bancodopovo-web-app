import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RepresentanteState } from '../reducers/representante.reducers';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';

export const selectRepresentanteState = createFeatureSelector<RepresentanteState>('representantes');

export const selectRepresentanteCount = baseSelectCount(selectRepresentanteState);

export const selectRepresentantePageShow = baseSelectPageShow(selectRepresentanteState);

export const selectPessoasFisicas = createSelector(
    selectRepresentanteState,
    state => state.pessoasFisicas
);

export const selectPessoaFisicaSelecionada = (idPessoa: number) => createSelector(
    selectPessoasFisicas,
    pessoas => {
        const pessoa = pessoas.filter(p => p.id === idPessoa);
        return (pessoa) ? pessoa[0] : undefined;
    }
);
