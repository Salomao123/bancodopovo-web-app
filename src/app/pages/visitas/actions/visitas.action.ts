import { createAction, props } from '@ngrx/store';
import { Visita } from '../../../models/visita';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';

export const countVisita = createAction('[Visita] Count',
    props<{ filter: Visita, afterCount: () => void }>());

export const countVisitaSucesso = createAction('[Visita] Count Sucesso',
    props<{ filter: Visita, count: number, afterCount: () => void }>());

export const countVisitaErro = createAction('[Visita] Count Erro');

export const pesquisarVisita = createAction('[Visita] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarVisitaSucesso = createAction('[Visita] Pesquisar Sucesso',
    props<{ registros: Visita[], page: PageQuery, sort: SortMeta }>());

export const pesquisarVisitaErro = createAction('[Visita] Pesquisar Erro');

export const salvarVisita = createAction('[Visita] Salvar',
    props<{ registro: Visita, afterSave: () => void }>());

export const salvarVisitaSucesso = createAction('[Visita] Salvar Sucesso',
    props<{ registro: Visita, insert: boolean }>());

export const atualiarStatusVisita = createAction('[Visita] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusVisitaSucesso = createAction('[Visita] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());
