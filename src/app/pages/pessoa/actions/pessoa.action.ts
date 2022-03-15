import { createAction, props } from '@ngrx/store';
import { Pessoa } from '../../../models/pessoa';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';

export const countPessoa = createAction('[Pessoa] Count',
    props<{ filter: Pessoa, afterCount: () => void }>());

export const countPessoaSucesso = createAction('[Pessoa] Count Sucesso',
    props<{ filter: Pessoa, count: number, afterCount: () => void }>());

export const countPessoaErro = createAction('[Pessoa] Count Erro');

export const pesquisarPessoa = createAction('[Pessoa] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarPessoaSucesso = createAction('[Pessoa] Pesquisar Sucesso',
    props<{ registros: Pessoa[], page: PageQuery, sort: SortMeta }>());

export const pesquisarPessoaErro = createAction('[Pessoa] Pesquisar Erro');

export const salvarPessoa = createAction('[Pessoa] Salvar',
    props<{ registro: Pessoa, afterSave: () => void }>());

export const salvarPessoaSucesso = createAction('[Pessoa] Salvar Sucesso',
    props<{ registro: Pessoa, insert: boolean }>());

export const atualiarStatusPessoa = createAction('[Pessoa] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusPessoaSucesso = createAction('[Pessoa] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());
