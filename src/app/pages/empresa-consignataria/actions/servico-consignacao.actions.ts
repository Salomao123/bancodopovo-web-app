import { createAction, props } from '@ngrx/store';
import { ServicoConsignacao } from '../../../models/servico-consignacao';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';

export const countServicoConsignacao = createAction('[Servico Consignacao] Count',
props<{ filter: ServicoConsignacao, afterCount: () => void }>());

export const countServicoConsignacaoSucesso = createAction('[Servico Consignacao] Count Sucesso',
props<{ filter: ServicoConsignacao, count: number, afterCount: () => void }>());

export const countServicoConsignacaoErro = createAction('[Servico Consignacao] Count Erro');

export const pesquisarServicoConsignacao = createAction('[Servico Consignacao] Pesquisar',
props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarServicoConsignacaoSucesso = createAction('[Servico Consignacao] Pesquisar Sucesso',
props<{ registros: ServicoConsignacao[], page: PageQuery, sort: SortMeta }>());

export const pesquisarServicoConsignacaoErro = createAction('[Servico Consignacao] Pesquisar Erro');

export const salvarServicoConsignacao = createAction('[Servico Consignacao] Salvar',
props<{ registro: ServicoConsignacao, afterSave: () => void }>());

export const salvarServicoConsignacaoSucesso = createAction('[Servico Consignacao] Salvar Sucesso',
props<{ registro: ServicoConsignacao, insert: boolean }>());

export const atualizarStatusServicoConsignacao = createAction('[Servico Consignacao] Atualizar Status',
props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusServicoConsignacaoSucesso = createAction('[Servico Consignacao] Atualizar Status Sucesso',
props<{ id: number, status: StatusRegistroEnum }>());
