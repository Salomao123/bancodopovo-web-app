import { EntityAdapter } from '@ngrx/entity';
import { LinhaCredito } from '../../../models/linha-credito';
import { createReducer, Action, on } from '@ngrx/store';
import * as LinhasCreditoActions from '../actions/linhas-credito.action';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, updateRegStatus, upsertOnState } from '../../base.reducers.paginator';

export const adapter: EntityAdapter<LinhaCredito> = getEntityAdapter<LinhaCredito>();

export interface LinhasCreditoState extends BaseEntityState<LinhaCredito> {}

export const initialLinhaCreditoState: LinhasCreditoState = initialState(adapter, {});

const initLinhaCreditoReducer = createReducer(
    initialLinhaCreditoState,
    on(LinhasCreditoActions.countLinhaCreditoSucesso, (state, {filter, count}) => {
        return {...initialLinhaCreditoState, filter, count};
    }),
    on(LinhasCreditoActions.countLinhaCreditoErro, (state) => ({...initialLinhaCreditoState})),
    on(LinhasCreditoActions.pesquisarLinhaCreditoSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(LinhasCreditoActions.salvarLinhaCreditoSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(LinhasCreditoActions.atualizarStatusLinhaCreditoSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    })
);

export function linhasCreditoReducer(state: LinhasCreditoState | undefined, action: Action) {
    return initLinhaCreditoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
