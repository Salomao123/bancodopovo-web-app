import { createAction, props } from '@ngrx/store';
import { Evento } from '../../../models/evento';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusEventoEnum } from '../../../enums/status.evento';

export const countEvento = createAction('[Evento] Count',
    props<{ filter: Evento, afterCount: () => void }>());

export const countEventoSucesso = createAction('[Evento] Count Sucesso',
    props<{ filter: Evento, count: number, afterCount: () => void }>());

export const countEventoErro = createAction('[Evento] Count Erro');

export const pesquisarEvento = createAction('[Evento] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarEventoSucesso = createAction('[Evento] Pesquisar Sucesso',
    props<{ registros: Evento[], page: PageQuery, sort: SortMeta }>());

export const pesquisarEventoErro = createAction('[Evento] Pesquisar Erro');

export const salvarEvento = createAction('[Evento] Salvar',
    props<{ registro: Evento, afterSave: () => void }>());

export const salvarEventoSucesso = createAction('[Evento] Salvar Sucesso',
    props<{ registro: Evento, insert: boolean }>());

export const atualiarStatusEvento = createAction('[Evento] Atualizar Status',
    props<{ id: number, status: StatusEventoEnum }>());

export const atualizarStatusEventoSucesso = createAction('[Evento] Atualizar Status Sucesso',
    props<{ id: number, status: StatusEventoEnum }>());
