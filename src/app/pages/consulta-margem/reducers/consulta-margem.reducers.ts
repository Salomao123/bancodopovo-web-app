import { VisualizacaoMargem } from '../../../models/visualizacao-margem';
import { createReducer, Action, on } from '@ngrx/store';
import * as ConsultaMargemActions from '../actions/consulta-margem.actions';
import { ServicoConsignacao } from '../../../models/servico-consignacao';

export interface ConsultaMargemState {
    margem: VisualizacaoMargem;
    servicos: ServicoConsignacao[];
}

export const initialConsultaMargemState: ConsultaMargemState = {
    margem: undefined,
    servicos: undefined,
};

const initConsultaMargemReducer = createReducer(
    initialConsultaMargemState,
    on(ConsultaMargemActions.consultarMargemSucesso, (state, {margem}) => {
        if (!margem) {
            margem = new VisualizacaoMargem();
        }
        return {...state, margem};
    }),
    on(ConsultaMargemActions.consultarMargemErro, (state) => ({...initialConsultaMargemState})),
    on(ConsultaMargemActions.solicitarConsultaMargemSucesso, (state, {margem}) => {
        return {...state, margem};
    }),
    on(ConsultaMargemActions.limparMargemConsulta, (state) => {
        return {...initialConsultaMargemState};
    }),
    on(ConsultaMargemActions.recuperarServicosConsignacaoAtivosConsultaMargemSucesso, (state, {servicos}) => {
        return {...state, servicos};
    }),
    on(ConsultaMargemActions.salvarPropostaConsultaMargemSucesso, (state) => {
        return {...initialConsultaMargemState, servicos: state.servicos};
    })
);

export function consultaMargemReducer(state: ConsultaMargemState | undefined, action: Action) {
    return initConsultaMargemReducer(state, action);
}
