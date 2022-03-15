import { EmpregadoConsignante } from 'src/app/models/empregado-consignante';
import { createReducer, on, Action } from '@ngrx/store';
import * as SimuladorActions from '../actions/simulador.actions';
import { SimulacaoVo } from '../../../vo/simulacao.vo';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { getEntityAdapter, BaseEntityState, initialState } from '../../base.reducers.paginator';

export const adapter: EntityAdapter<SimulacaoVo> = createEntityAdapter<SimulacaoVo>({
    selectId: (simulacaoVo: SimulacaoVo) => simulacaoVo.servicoConsignacao.id,
});

export interface SimuladorState extends BaseEntityState<SimulacaoVo> {
    empregados: EmpregadoConsignante[];
    simulacaoSelecionado: number;
}

export const initialSimuladorState: SimuladorState = initialState(adapter, {
    empregados: undefined,
    simulacaoSelecionado: undefined,
});

const initSimuladorReducer = createReducer(
    initialSimuladorState,
    on(SimuladorActions.limparSimulacoesSimulador, (state) => ({...initialSimuladorState})),
    on(SimuladorActions.recuperarVinculosSimuladorSucesso, (state, {empregados}) => ({...state, empregados})),
    on(SimuladorActions.compararSimulacoesSimuladorSucesso, (state, {simulacoes}) => {
        return adapter.addAll(simulacoes, state);
    }),
    on(SimuladorActions.realizarSimulacaoSimuladorSucesso, (state, {idServicoConsignacao, simulacoes}) => {
        // const simulacaoVo = Object.assign({}, state.simulacoes.find(s => s.servicoConsignacao.id === idServicoConsignacao));
        // simulacaoVo.simulacoesEmprestimos = simulacoes;

        // const simulacoesVo = Object.assign([], state.simulacoes.filter(s => s.servicoConsignacao.id !== idServicoConsignacao));
        // return {...state, simulacoes: [...simulacoesVo, simulacaoVo], simulacaoSelecionado: idServicoConsignacao};
        return adapter.updateOne({
            id: idServicoConsignacao,
            changes: {
                ...state.entities[idServicoConsignacao],
                simulacoesEmprestimos: simulacoes
            }
        }, {...state, simulacaoSelecionado: idServicoConsignacao});
    })
);

export function simuladorReducer(state: SimuladorState | undefined, action: Action) {
    return initSimuladorReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
