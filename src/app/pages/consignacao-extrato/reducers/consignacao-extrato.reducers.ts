import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ConsignadoPropostasVo } from '../../../vo/consignado-propostas.vo';
import { BaseEntityState, initialState } from '../../base.reducers.paginator';
import { createReducer, on, Action } from '@ngrx/store';
import * as ConsignacaoExtratoActions from '../actions/consignacao-extrato.actions';

export const adapter: EntityAdapter<ConsignadoPropostasVo> = createEntityAdapter<ConsignadoPropostasVo>({
    selectId: (consignadoPropostasVo: ConsignadoPropostasVo) => consignadoPropostasVo.consignado.id,
});

export interface ConsignacaoExtratoState extends BaseEntityState<ConsignadoPropostasVo> {
    consignadoSelecionado: number;
}

export const initialConsignacaoExtratoState: ConsignacaoExtratoState = initialState(adapter, {
    consignadoSelecionado: undefined,
});

const initConsignacaoExtratoReducer = createReducer(
    initialConsignacaoExtratoState,
    on(ConsignacaoExtratoActions.recuperarVinculosConsignacaoExtratoSucesso, (state, {consignados}) => {
        return adapter.addAll(consignados.map(c => ({
            consignado: c,
            propostas: []
        })), state);
    }),
    on(ConsignacaoExtratoActions.recuperarPropostasConsignacaoExtrato, (state, {consignadoSelecionado}) =>
        ({...state, consignadoSelecionado})),
    on(ConsignacaoExtratoActions.recuperarPropostasConsignacaoExtratoSucesso, (state, {propostas}) => {
        return adapter.updateOne({
            id: state.consignadoSelecionado,
            changes: {
                ...state.entities[state.consignadoSelecionado],
                propostas
            }
        }, state);
    })
);

export function consignacaoExtratoReducer(state: ConsignacaoExtratoState | undefined, action: Action) {
    return initConsignacaoExtratoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
