import { EntityAdapter } from '@ngrx/entity';
import { VisualizacaoMargem } from 'src/app/models/visualizacao-margem';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState } from '../../base.reducers.paginator';
import { createReducer, Action, on } from '@ngrx/store';
import * as VisualizacaoMargemActions from '../actions/visualizacao-margem.actions';

export const adapter: EntityAdapter<VisualizacaoMargem> = getEntityAdapter<VisualizacaoMargem>();

export interface VisualizacaoMargemState extends BaseEntityState<VisualizacaoMargem> { }

export const initialVisualizacaoMargemState: VisualizacaoMargemState = initialState(adapter, {});

const initVisualizacaoMargemReducer = createReducer(
    initialVisualizacaoMargemState,
    on(VisualizacaoMargemActions.countVisualizacaoMargemSucesso, (state, {filter, count}) => {
        return {...initialVisualizacaoMargemState, filter, count};
    }),
    on(VisualizacaoMargemActions.countVisualizacaoMargemErro, (state) => ({...initialVisualizacaoMargemState})),
    on(VisualizacaoMargemActions.pesquisarVisualizacaoMargemSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(VisualizacaoMargemActions.pesquisarVisualizacaoMargemErro, (state) => ({...initialVisualizacaoMargemState})),
    on(VisualizacaoMargemActions.atualizarSituacaoVisualizacaoMargemSucesso, (state, {id, situacao}) => {
        return adapter.updateOne({
            id,
            changes: {...state.entities[id], situacao}
        }, state);
    })
);

export function visualizacaoMargemReducer(state: VisualizacaoMargemState | undefined, action: Action) {
    return initVisualizacaoMargemReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
