import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsuarioState } from '../reducers/usuario.reducers';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';
import { Pessoa } from '../../../models/pessoa';
import { Empresa } from '../../../models/empresa';
import { EmpregadoConsignante } from '../../../models/empregado-consignante';
import { EmpresaConsignataria } from '../../../models/empresa-consignataria';

export const selectUsuarioState = createFeatureSelector<UsuarioState>('usuarios');

export const selectUsuarioCount = baseSelectCount(selectUsuarioState);

export const selectUsuariosPageShow = baseSelectPageShow(selectUsuarioState);

export const selectPessoasFisicas = createSelector(
    selectUsuarioState,
    state => state.pessoasFisicas
);

export const selectEmpresas = createSelector(
    selectUsuarioState,
    state => state.empresas
);

export const selectEmpresasConsignatarias = createSelector(
    selectUsuarioState,
    state => state.empresasConsignatarias
);

export const selectEmpregados = (idEmpresa: number) => createSelector(
    selectUsuarioState,
    state => {
        if (state.empresasEmpregados) {
            const idEmpresaParaConsulta = (idEmpresa) ? idEmpresa : state.empresaSelecionada;

            const empresaEmpregados = state.empresasEmpregados.filter(e => e.idEmpresa === idEmpresaParaConsulta);
            return (empresaEmpregados.length > 0) ? empresaEmpregados[0].empregados : undefined;
        }

        return undefined;
    }
);

export const selectEmpregadosEmpresaSelecionada = createSelector(
    selectEmpregados(undefined),
    empregados => empregados
);

export const selectPessoaSelecionada = (pessoa: Pessoa) => createSelector(
    selectPessoasFisicas,
    pessoasFisicas => {
        if (pessoa.id && pessoasFisicas) {
            const pessoas = pessoasFisicas.filter(p => p.id === pessoa.id);
            return (pessoas.length > 0) ? pessoas[0] : undefined;
        }

        return undefined;
    }
);

export const selectEmpresaSelecionada = (empresa: Empresa) => createSelector(
    selectEmpresas,
    empresasState => {
        if (empresa.id && empresasState) {
            const empresas = empresasState.filter(e => e.id === empresa.id);
            return (empresas.length > 0) ? empresas[0] : undefined;
        }
        return undefined;
    }
);

export const selectEmpregadoConsignanteSelecionado = (empregado: EmpregadoConsignante) => createSelector(
    selectEmpregadosEmpresaSelecionada,
    empregadosState => {
        if (empregado.id && empregadosState) {
            const empregados = empregadosState.filter(e => e.id === empregado.id);
            return (empregados.length > 0) ? empregados[0] : undefined;
        }
        return undefined;
    }
);

export const selectEmpresaConsignatariaSelecionada = (empresaConsignataria: EmpresaConsignataria) => createSelector(
    selectEmpresasConsignatarias,
    empresasConsignatariasState => {
        if (empresaConsignataria.id && empresasConsignatariasState) {
            const empresasConsignatarias = empresasConsignatariasState.filter(e => e.id === empresaConsignataria.id);
            return (empresasConsignatarias.length > 0) ? empresasConsignatarias[0] : undefined;
        }
        return undefined;
    }
);
