import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaxasParcelasState } from '../reducers/taxas-parcelas.reducers';
import * as fromTaxasParcelasReducer from '../reducers/taxas-parcelas.reducers';

export const selectTaxasParcelasState = createFeatureSelector<TaxasParcelasState>('taxas-parcelas');

export const selectParcelasTaxasParcelas = createSelector(
    selectTaxasParcelasState,
    fromTaxasParcelasReducer.selectAll
);

export const selectParcelasSelecionadasTaxasParcelas = createSelector(
    selectParcelasTaxasParcelas,
    parcelas => parcelas.filter(p => p.selecionado)
);
