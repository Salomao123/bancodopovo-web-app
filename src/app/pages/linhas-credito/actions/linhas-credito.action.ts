import { createAction, props } from '@ngrx/store';
import { LinhaCredito } from '../../../models/linha-credito';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';

export const countLinhaCredito = createAction('[LinhaCredito] Count',
    props<{ filter: LinhaCredito, afterCount: () => void }>());

export const countLinhaCreditoSucesso = createAction('[LinhaCredito] Count Sucesso',
    props<{ filter: LinhaCredito, count: number, afterCount: () => void }>());

export const countLinhaCreditoErro = createAction('[LinhaCredito] Count Erro');

export const pesquisarLinhaCredito = createAction('[LinhaCredito] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarLinhaCreditoSucesso = createAction('[LinhaCredito] Pesquisar Sucesso',
    props<{ registros: LinhaCredito[], page: PageQuery, sort: SortMeta }>());

export const pesquisarLinhaCreditoErro = createAction('[LinhaCredito] Pesquisar Erro');

export const salvarLinhaCredito = createAction('[LinhaCredito] Salvar',
    props<{ registro: LinhaCredito, afterSave: () => void }>());

export const salvarLinhaCreditoSucesso = createAction('[LinhaCredito] Salvar Sucesso',
    props<{ registro: LinhaCredito, insert: boolean }>());

export const atualiarStatusLinhaCredito = createAction('[LinhaCredito] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusLinhaCreditoSucesso = createAction('[LinhaCredito] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());
