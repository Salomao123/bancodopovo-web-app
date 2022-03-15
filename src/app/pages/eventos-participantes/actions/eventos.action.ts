import { createAction, props } from '@ngrx/store';
import { Participante } from '../../../models/participante';
import { PageQuery, SortMeta } from '../../../util/pagination';

export const adicionarParticipante = createAction('[Participante] Adicionar',
    props<{ registro: Participante, afterSave: () => void }>());

export const adicionarParticipanteSucesso = createAction('[Participante] Salvar Sucesso',
    props<{ registro: Participante, insert: boolean }>());

export const excluirParticipante = createAction('[Participante] Excluir',
    props<{ registro: Participante }>());

export const excluirParticipanteSucesso = createAction('[Participante] Excluir Sucesso',
    props<{ registro: Participante }>());

export const countParticipante = createAction('[Participante] Count',
    props<{ filter: Participante, afterCount: () => void }>());

export const countParticipanteSucesso = createAction('[Participante] Count Sucesso',
    props<{ filter: Participante, count: number, afterCount: () => void }>());

export const countParticipanteErro = createAction('[Participante] Count Erro');

export const pesquisarParticipante = createAction('[Participante] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarParticipanteSucesso = createAction('[Participante] Pesquisar Sucesso',
    props<{ registros: Participante[], page: PageQuery, sort: SortMeta }>());

export const pesquisarParticipanteErro = createAction('[Participante] Pesquisar Erro');
