import { createAction, props } from '@ngrx/store';
import { Perfil } from '../../../models/perfil';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';

export const countPerfil = createAction('[Perfil] Count',
    props<{ filter: Perfil, afterCount: () => void }>());

export const countPerfilSucesso = createAction('[Perfil] Count Sucesso',
    props<{ filter: Perfil, count: number, afterCount: () => void }>());

export const countPerfilErro = createAction('[Perfil] Count Erro');

export const pesquisarPerfil = createAction('[Perfil] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarPerfilSucesso = createAction('[Perfil] Pesquisar Sucesso',
    props<{ perfis: Perfil[], page: PageQuery, sort: SortMeta }>());

export const pesquisarPerfilErro = createAction('[Perfil] Pesquisar Erro');

export const salvarPerfil = createAction('[Perfil] Salvar',
    props<{ perfil: Perfil, afterSave: () => void }>());

export const salvarPerfilSucesso = createAction('[Perfil] Salvar Sucesso',
    props<{ perfil: Perfil, insert: boolean }>());

export const atualiarStatusPerfil = createAction('[Perfil] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum, afterSave: () => void }>());

export const atualizarStatusPerfilSucesso = createAction('[Perfil] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());
