import { createAction, props } from '@ngrx/store';
import { EmpresaConsignataria } from '../../../models/empresa-consignataria';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';
import { Pessoa } from '../../../models/pessoa';
import { Banco } from '../../../models/banco';

export const countEmpresaConsignataria = createAction('[Empresa Consignataria] Count',
    props<{ filter: EmpresaConsignataria, afterCount: () => void }>());

export const countEmpresaConsignatariaSucesso = createAction('[Empresa Consignataria] Count Sucesso',
    props<{ filter: EmpresaConsignataria, count: number, afterCount: () => void }>());

export const countEmpresaConsignatariaErro = createAction('[Empresa Consignataria] Count Erro');

export const pesquisarEmpresaConsignataria = createAction('[Empresa Consignataria] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarEmpresaConsignatariaSucesso = createAction('[Empresa Consignataria] Pesquisar Sucesso',
    props<{ registros: EmpresaConsignataria[], page: PageQuery, sort: SortMeta }>());

export const pesquisarEmpresaConsignatariaErro = createAction('[Empresa Consignataria] Pesquisar Erro');

export const salvarEmpresaConsignataria = createAction('[Empresa Consignataria] Salvar',
    props<{ registro: EmpresaConsignataria, afterSave: () => void }>());

export const salvarEmpresaConsignatariaSucesso = createAction('[Empresa Consignataria] Salvar Sucesso',
    props<{ registro: EmpresaConsignataria, insert: boolean }>());

export const atualizarStatusEmpresaConsignataria = createAction('[Empresa Consignataria] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusEmpresaConsignatariaSucesso = createAction('[Empresa Consignataria] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());

export const consultarPessoasJuridicasEmpCons = createAction('[Empresa Consignataria Pessoa] Consultar Pessoas Juridicas');

export const consultarPessoasJuriticasEmpConsSucesso = createAction('[Empresa Consignataria Pessoa] Consultar Pessoas Juridicas Sucesso',
    props<{ pessoasJuridicas: Pessoa[] }>());

export const consultarBancosEmpCons = createAction('[Empresa Consignataria] Consultar Bancos');

export const consultarBancosEmpConsSucesso = createAction('[Empresa Consignataria] Consultar Bancos Sucesso',
    props<{ bancos: Banco[] }>());
