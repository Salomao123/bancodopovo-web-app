import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmpregadoConsignanteState } from '../reducers/empregado-consignante.reducers';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';

export const selectEmpregadoConsignanteState = createFeatureSelector<EmpregadoConsignanteState>('empregados-consignantes');

export const selectEmpregadoConsignanteCount = baseSelectCount(selectEmpregadoConsignanteState);

export const selectEmpregadoConsignantePageShow = baseSelectPageShow(selectEmpregadoConsignanteState);

export const selectPessoasFisicas = createSelector(
    selectEmpregadoConsignanteState,
    state => state.pessoasFisicas
);

export const selectEmpresas = createSelector(
    selectEmpregadoConsignanteState,
    state => state.empresas
);

export const selectEmpregadoConsignantePorId = (id: number) => createSelector(
    selectEmpregadoConsignanteState,
    state => state.entities[id]
);
