import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SimuladorState } from '../reducers/simulador.reducers';
import * as fromSimuladorReducer from '../reducers/simulador.reducers';

export const selectSimuladorState = createFeatureSelector<SimuladorState>('simulador');

export const selectEmpregadosSimulador = createSelector(
    selectSimuladorState,
    state => state.empregados
);

export const selectSimulacoesSimulador = createSelector(
    selectSimuladorState,
    fromSimuladorReducer.selectAll
);

export const selectSimulacaoSelecionadoSimulador = createSelector(
    selectSimuladorState,
    selectSimulacoesSimulador,
    (state, simulacoes) => {
        if (simulacoes && state.simulacaoSelecionado) {
            const simulacao = simulacoes.find(s => s.servicoConsignacao.id === state.simulacaoSelecionado);
            return (simulacao) ? simulacao : undefined;
        }
    }
);
