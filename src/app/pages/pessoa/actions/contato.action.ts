import { createAction, props } from '@ngrx/store';
import { Contato } from '../../../models/contato';
import { SortMeta, PageQuery } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';

export const countContato = createAction('[Contato] Count',
    props<{ filter: Contato, afterCount: () => void }>());

export const countContatoSucesso = createAction('[Contato] Count Sucesso',
    props<{ filter: Contato, count: number, afterCount: () => void }>());

export const countContatoErro = createAction('[Contato] Count Erro');

export const pesquisarContato = createAction('[Contato] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarContatoSucesso = createAction('[Contato] Pesquisar Sucesso',
    props<{ registros: Contato[], page: PageQuery, sort: SortMeta }>());

export const pesquisarContatoErro = createAction('[Contato] Pesquisar Erro');

export const carreagarDependenciasContato = createAction('[Contato] Carregar Dependencias',
    props<{ registro: Contato, afterSave: () => void }>());

export const salvarContato = createAction('[Contato] Salvar',
    props<{ registro: Contato, afterSave: () => void }>());

export const salvarContatoSucesso = createAction('[Contato] Salvar Sucesso',
    props<{ registro: Contato, insert: boolean }>());

export const atualizarStatusContato = createAction('[Contato] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusContatoSucesso = createAction('[Contato] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());
