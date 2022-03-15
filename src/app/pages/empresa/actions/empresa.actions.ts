import { createAction, props } from '@ngrx/store';
import { Empresa } from '../../../models/empresa';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';
import { Pessoa } from '../../../models/pessoa';

export const countEmpresa = createAction('[Empresa] Count',
props<{ filter: Empresa, afterCount: () => void }>());

export const countEmpresaSucesso = createAction('[Empresa] Count Sucesso',
props<{ filter: Empresa, count: number, afterCount: () => void }>());

export const countEmpresaErro = createAction('[Empresa] Count Erro');

export const pesquisarEmpresa = createAction('[Empresa] Pesquisar',
props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarEmpresaSucesso = createAction('[Empresa] Pesquisar Sucesso',
props<{ empresas: Empresa[], page: PageQuery, sort: SortMeta }>());

export const pesquisarEmpresaErro = createAction('[Empresa] Pesquisar Erro');

export const salvarEmpresa = createAction('[Empresa] Salvar',
props<{ empresa: Empresa, afterSave: () => void }>());

export const salvarEmpresaSucesso = createAction('[Empresa] Salvar Sucesso',
props<{ empresa: Empresa, insert: boolean }>());

export const atualiarStatusEmpresa = createAction('[Empresa] Atualizar Status',
props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusEmpresaSucesso = createAction('[Empresa] Atualizar Status Sucesso',
props<{ id: number, status: StatusRegistroEnum }>());

export const consultarPessoasJuridicas = createAction('[Empresa Pessoa] Consultar Pessoas Juridicas');

export const consultarPessoasJuriticasSucesso = createAction('[Empresa Pessoa] Consultar Pessoas Juridicas Sucesso',
    props<{ pessoasJuridicas: Pessoa[] }>());
