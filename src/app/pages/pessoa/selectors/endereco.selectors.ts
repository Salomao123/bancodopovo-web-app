import { EnderecoState } from '../reducers/endereco.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';

export const selectEnderecoState = createFeatureSelector<EnderecoState>('enderecos');

export const selectEnderecoCount = baseSelectCount(selectEnderecoState);

export const selectEnderecoPageShow = baseSelectPageShow(selectEnderecoState);

export const selectUfCidades = (idUf: number) => createSelector(
    selectEnderecoState,
    state => {
        return (state.ufCidades) ? state.ufCidades.filter(uc => uc.idUf === idUf)[0] : undefined;
    }
);

export const selectUfs = createSelector(
    selectEnderecoState,
    state => state.ufs
);

export const selectCidades = createSelector(
    selectEnderecoState,
    state => {
        if (state.ufSelecionada) {
            const ufCidades = state.ufCidades.filter(uc => uc.idUf === state.ufSelecionada);
            return (ufCidades) ? ufCidades[0].cidades : undefined;
        }

        return undefined;
    }
);
