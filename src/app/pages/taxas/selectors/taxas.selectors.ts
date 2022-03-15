import * as fromTaxasReducer from '../reducers/taxas.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaxasState } from '../reducers/taxas.reducers';

export const selectTaxasState = createFeatureSelector<TaxasState>('taxas');

export const selectServicosConsignacoesAtivos = createSelector(
    selectTaxasState,
    fromTaxasReducer.selectAll
);

export const selectParcelasServicoSelecionado = createSelector(
    selectTaxasState,
    state => {
        const spfind = (state.servicoParcelas) ? state.servicoParcelas.find(sp => sp.idServicoConsignacao === state.idServicoSelecionado) : undefined;
        return (spfind) ? spfind.parcelas : undefined;
    }
);
