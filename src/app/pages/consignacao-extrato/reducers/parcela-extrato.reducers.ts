import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PropostaParcelasVo } from '../../../vo/proposta-parcelas.vo';
import { BaseEntityState, initialState } from '../../base.reducers.paginator';
import { createReducer, on, Action } from '@ngrx/store';
import * as ConsignacaoExtratoActions from '../actions/consignacao-extrato.actions';

export const adapter: EntityAdapter<PropostaParcelasVo> = createEntityAdapter<PropostaParcelasVo>({
    selectId: (propostaParcelasVo: PropostaParcelasVo) => propostaParcelasVo.idProposta,
});

export interface ParcelaExtratoState extends BaseEntityState<PropostaParcelasVo> {
    propostaSelecionada: number;
}

export const initialParcelaExtratoState: ParcelaExtratoState = initialState(adapter, {
    propostaSelecionada: undefined,
});

const initParcelaExtratoReducer = createReducer(
    initialParcelaExtratoState,
    on(ConsignacaoExtratoActions.recuperarParcelasPropostasConsignacaoExtrato, (state, {idProposta}) => {
        return {...state, propostaSelecionada: idProposta};
    }),
    on(ConsignacaoExtratoActions.recuperarParcelasPropostasConsignacaoExtratoSucesso, (state, {parcelas}) => {
        return adapter.upsertOne({
            idProposta: state.propostaSelecionada,
            parcelas
        }, state);
    })
);

export function parcelaExtratoReducer(state: ParcelaExtratoState | undefined, action: Action) {
    return initParcelaExtratoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
