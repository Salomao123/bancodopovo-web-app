import { createAction, props } from '@ngrx/store';
import { EmpregadoConsignante } from '../../../models/empregado-consignante';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';
import { Pessoa } from '../../../models/pessoa';
import { Empresa } from '../../../models/empresa';

export const countEmpregadoConsignante = createAction('[Empregado Consignante] Count',
    props<{ filter: EmpregadoConsignante, afterCount: () => void }>());

export const countEmpregadoConsignanteSucesso = createAction('[Empregado Consignante] Count Sucesso',
    props<{ filter: EmpregadoConsignante, count: number, afterCount: () => void }>());

export const countEmpregadoConsignanteErro = createAction('[Empregado Consignante] Count Erro');

export const pesquisarEmpregadoConsignante = createAction('[Empregado Consignante] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarEmpregadoConsignanteSucesso = createAction('[Empregado Consignante] Pesquisar Sucesso',
    props<{ registros: EmpregadoConsignante[], page: PageQuery, sort: SortMeta }>());

export const pesquisarEmpregadoConsignanteErro = createAction('[Empregado Consignante] Pesquisar Erro');

export const salvarEmpregadoConsignante = createAction('[Empregado Consignante] Salvar',
    props<{ registro: EmpregadoConsignante, afterSave: () => void }>());

export const salvarEmpregadoConsignanteSucesso = createAction('[Empregado Consignante] Salvar Sucesso',
    props<{ registro: EmpregadoConsignante, insert: boolean }>());

export const atualizarStatusEmpregadoConsignante = createAction('[Empregado Consignante] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusEmpregadoConsignanteSucesso = createAction('[Empregado Consignante] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());

export const consultarPessoasFisicasEmpregadoConsignante = createAction('[Empregado Consignante] Consultar Pessoas Fisicas');

export const consultarPessoasFisicasEmpregadoConsignanteSucesso = createAction('[Empregado Consignante] Consultar Pessoas Fisicas Sucesso',
    props<{ pessoasFisicas: Array<Pessoa> }>());

export const consultarEmpresasEmpregadoConsignante = createAction('[Empregado Consignante] Consultar Empresas');

export const consultarEmpresasEmpregadoConsignanteSucesso = createAction('[Empregado Consignante] Consultar Empresas Sucesso',
    props<{ empresas: Array<Empresa> }>());

export const recuperarPorIdEmpregadoConsignante = createAction('[Empregado Consignante] Recuperar Por Id',
    props<{ id: number, afterConsulta: (empregadoConsingnate: EmpregadoConsignante) => void }>());

export const recuperarPorIdEmpregadoConsignanteSucesso = createAction('[Empregado Consignante] Recuperar Por Id Sucesso',
    props<{ empregadoConsignante: EmpregadoConsignante, afterConsulta: (empregadoConsingnate: EmpregadoConsignante) => void }>());
