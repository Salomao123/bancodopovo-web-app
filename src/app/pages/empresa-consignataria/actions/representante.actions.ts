import { createAction, props } from '@ngrx/store';
import { Representante } from '../../../models/representante';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';
import { Pessoa } from '../../../models/pessoa';

export const countRepresentante = createAction('[Representante] Count',
    props<{ filter: Representante, afterCount: () => void }>());

export const countRepresentanteSucesso = createAction('[Representante] Count Sucesso',
    props<{ filter: Representante, count: number, afterCount: () => void }>());

export const countRepresentanteErro = createAction('[Representante] Count Erro');

export const pesquisarRepresentante = createAction('[Representante] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarRepresentanteSucesso = createAction('[Representante] Pesquisar Sucesso',
    props<{ registros: Representante[], page: PageQuery, sort: SortMeta }>());

export const pesquisarRepresentanteErro = createAction('[Representante] Pesquisar Erro');

export const carreagarDependenciasRepresentante = createAction('[Representante] Carregar Dependencias',
    props<{ registro: Representante, afterSave: () => void }>());

export const salvarRepresentante = createAction('[Representante] Salvar',
    props<{ registro: Representante, afterSave: () => void }>());

export const salvarRepresentanteSucesso = createAction('[Representante] Salvar Sucesso',
    props<{ registro: Representante, insert: boolean }>());

export const atualizarStatusRepresentante = createAction('[Representante] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusRepresentanteSucesso = createAction('[Representante] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());

export const consultarPessoasFisicasRep = createAction('[Representante Pessoa] Consultar Pessoas Fisicas');

export const consultarPessoasFisicasRepSucesso = createAction('[Representante Pessoa] Consultar Pessoas Fisicas Sucesso',
    props<{ pessoasFisicas: Pessoa[] }>());
