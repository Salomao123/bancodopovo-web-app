import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmpresaConsignatariaState } from '../reducers/empresa-consignataria.reducers';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';

export const selectEmpresaConsignatariaState = createFeatureSelector<EmpresaConsignatariaState>('empresas-consignatarias');

export const selectEmpresaConsignatariaCount = baseSelectCount(selectEmpresaConsignatariaState);

export const selectEmpresaConsignatariaPageShow = baseSelectPageShow(selectEmpresaConsignatariaState);

export const selectPessoasJuridicas = createSelector(
    selectEmpresaConsignatariaState,
    state => state.pessoasJuridicas
);

export const selectBancos = createSelector(
    selectEmpresaConsignatariaState,
    state => state.bancos
);
