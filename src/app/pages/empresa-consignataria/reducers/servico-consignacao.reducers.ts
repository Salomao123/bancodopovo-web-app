import { EntityAdapter } from '@ngrx/entity';
import { ServicoConsignacao } from '../../../models/servico-consignacao';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, upsertOnState, updateRegStatus } from '../../base.reducers.paginator';
import { createReducer, on, Action } from '@ngrx/store';
import * as ServicoConsignacaoActions from '../actions/servico-consignacao.actions';

export const adapter: EntityAdapter<ServicoConsignacao> = getEntityAdapter<ServicoConsignacao>();

export interface ServicoConsignacaoState extends BaseEntityState<ServicoConsignacao> { }

export const initialServicoConsignacaoState: ServicoConsignacaoState = initialState(adapter, {});

const initServicoConsignacaoReducer = createReducer(
    initialServicoConsignacaoState,
    on(ServicoConsignacaoActions.countServicoConsignacaoSucesso, (state, {filter, count}) => {
        return {...initialServicoConsignacaoState, filter, count};
    }),
    on(ServicoConsignacaoActions.countServicoConsignacaoErro, (state) => ({...initialServicoConsignacaoState})),
    on(ServicoConsignacaoActions.pesquisarServicoConsignacaoSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(ServicoConsignacaoActions.salvarServicoConsignacaoSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(ServicoConsignacaoActions.atualizarStatusServicoConsignacaoSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    })
);

export function servicoConsignacaoReducer(state: ServicoConsignacaoState | undefined, action: Action) {
    return initServicoConsignacaoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
