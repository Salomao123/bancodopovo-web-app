import { createAction, props } from '@ngrx/store';
import { Levantamento } from '../../../models/levantamento';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusLevantamentoEnum } from '../../../enums/status.levantamento';

export const countLevantamento = createAction('[Levantamento] Count',
    props<{ filter: Levantamento, afterCount: () => void }>());

export const countLevantamentoSucesso = createAction('[Levantamento] Count Sucesso',
    props<{ filter: Levantamento, count: number, afterCount: () => void }>());

export const countLevantamentoErro = createAction('[Levantamento] Count Erro');

export const pesquisarLevantamento = createAction('[Levantamento] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarLevantamentoSucesso = createAction('[Levantamento] Pesquisar Sucesso',
    props<{ registros: Levantamento[], page: PageQuery, sort: SortMeta }>());

export const pesquisarLevantamentoErro = createAction('[Levantamento] Pesquisar Erro');

export const salvarLevantamento = createAction('[Levantamento] Salvar',
    props<{ registro: Levantamento, afterSave: () => void }>());

export const salvarLevantamentoSucesso = createAction('[Levantamento] Salvar Sucesso',
    props<{ registro: Levantamento, insert: boolean }>());

export const atualiarStatusLevantamento = createAction('[Levantamento] Atualizar Status',
    props<{ id: number, status: StatusLevantamentoEnum }>());

export const atualizarStatusLevantamentoSucesso = createAction('[Levantamento] Atualizar Status Sucesso',
    props<{ id: number, status: StatusLevantamentoEnum }>());
