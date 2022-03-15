import { createAction, props } from '@ngrx/store';
import { Funcionalidade } from '../../../models/funcionalidade';
import { Acao } from '../../../models/acao';
import { PerfilFuncionalidadeAcao } from '../../../models/perfil-funcionalidade-acao';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';

export const recuperarFuncionalidadesAtivas = createAction('[Perfil] Recuperar Funcionalides Ativas');

export const recuperarFuncionalidadesAtivasSucesso = createAction('[Perfil] Recuperar Funcionalidades Ativas Sucesso',
    props<{ funcionalidades: Array<Funcionalidade> }>());

export const recuperarAcoesNaoVinculadas = createAction(
    '[Perfil] Recuperar Acoes Nao Vinculadas',
    props<{ idPerfil: number, idFuncionalidade: number }>()
);

export const recuperarAcoesNaoVinculadasSucesso = createAction(
    '[Perfil] Recuperar Acoes Nao Vinculadas Sucesso',
    props<{ acoes: Array<Acao> }>()
);

export const countPerfilFuncionalidadeAcao = createAction('[PerfilFuncionalidadeAcao] Count',
    props<{ filter: PerfilFuncionalidadeAcao, afterCount: () => void }>());

export const countPerfilFuncionalidadeAcaoSucesso = createAction('[PerfilFuncionalidadeAcao] Count Sucesso',
    props<{ filter: PerfilFuncionalidadeAcao, count: number, afterCount: () => void }>());

export const countPerfilFuncionalidadeAcaoErro = createAction('[PerfilFuncionalidadeAcao] Count Erro');

export const pesquisarPerfilFuncionalidadeAcao = createAction('[PerfilFuncionalidadeAcao] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarPerfilFuncionalidadeAcaoSucesso = createAction('[PerfilFuncionalidadeAcao] Pesquisar Sucesso',
    props<{ perfisFuncionalidadesAcoes: PerfilFuncionalidadeAcao[], page: PageQuery, sort: SortMeta }>());

export const pesquisarPerfilFuncionalidadeAcaoErro = createAction('[PerfilFuncionalidadeAcao] Pesquisar Erro');

export const salvarPerfilFuncionalidadeAcao = createAction('[PerfilFuncionalidadeAcao] Salvar',
    props<{ perfis: PerfilFuncionalidadeAcao[], afterSave: () => void }>());

export const salvarPerfilFuncionalidadeAcaoSucesso = createAction('[PerfilFuncionalidadeAcao] Salvar Sucesso',
    props<{ perfis: PerfilFuncionalidadeAcao[], afterSave: () => void }>());

export const atualizarStatusPerfilFuncionalidadeAcao = createAction('[PerfilFuncionalidadeAcao] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum, afterSave: () => void }>());

export const atualizarStatusPerfilFuncionalidadeAcaoSucesso = createAction('[PerfilFuncionalidadeAcao] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());
