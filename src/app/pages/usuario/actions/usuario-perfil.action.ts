import { StatusRegistroEnum } from './../../../enums/status.registro';
import { createAction, props } from '@ngrx/store';
import { UsuarioPerfil } from '../../../models/usuario-perfil';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { Perfil } from '../../../models/perfil';

export const countUsuarioPerfil = createAction('[Usuario Perfil] Count',
    props<{ filter: UsuarioPerfil, afterCount: () => void }>());

export const countUsuarioPerfilSucesso = createAction('[Usuario Perfil] Count Sucesso',
    props<{ filter: UsuarioPerfil, count: number, afterCount: () => void }>());

export const countUsuarioPerfilErro = createAction('[Usuario Perfil] Count Erro');

export const pesquisarUsuarioPerfil = createAction('[Usuario Perfil] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarUsuarioPerfilSucesso = createAction('[Usuario Perfil] Pesquisar Sucesso',
    props<{ registros: UsuarioPerfil[], page: PageQuery, sort: SortMeta }>());

export const pesquisarUsuarioPerfilErro = createAction('[Usuario Perfil] Pesquisar Erro');

export const carregarDependenciasUsuarioPerfilParaSalvar = createAction('[Usuario Perfil] Carregar Dependencias Para Salvar',
    props<{ registro: UsuarioPerfil, afterSave: () => void }>());

export const salvarUsuarioPerfil = createAction('[Usuario Perfil] Salvar',
    props<{ registro: UsuarioPerfil, afterSave: () => void }>());

export const salvarUsuarioPerfilSucesso = createAction('[Usuario Perfil] Salvar Sucesso',
    props<{ registro: UsuarioPerfil, insert: boolean }>());

export const atualizarStatusUsuarioPerfil = createAction('[Usuario Perfil] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusUsuarioPerfilSucesso = createAction('[Usuario Perfil] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());

export const recuperarPerfisAtivos = createAction('[Usuario Perfil] Recuperar Perfis Ativos',
    props<{ idUsuario: number }>());

export const recuperarPerfisAtivosSucesso = createAction('[Usuario Perfil] Recuperar Perfis Ativos Sucesso',
    props<{ perfis: Perfil[] }>());
