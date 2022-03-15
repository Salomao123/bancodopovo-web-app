import { Convenio } from '../../../models/convenio';
import { createReducer, on, Action } from '@ngrx/store';
import * as ConsultaConvenioActions from '../actions/consulta-convenio.actions';
import { ConvenioVo } from '../../../vo/convenio.vo';

export interface ConsultaConvenioState {
    cnpj: string;
    convenio: ConvenioVo;
}

export const initialConsultaConvenioState: ConsultaConvenioState = {
    cnpj: undefined,
    convenio: undefined
};

export const initConsultaConvenioReducer = createReducer(
    initialConsultaConvenioState,
    on(ConsultaConvenioActions.consultarConvenio, (state, {cnpj}) => ({ ...state, cnpj })),
    on(ConsultaConvenioActions.consultarConvenioSucesso, (state, {convenio}) => ({ ...state, convenio })),
    on(ConsultaConvenioActions.consultarConvenioErro, (state) => ({ ...initialConsultaConvenioState }))
);

export function consultaConvenioReducer(state: ConsultaConvenioState | undefined, action: Action) {
    return initConsultaConvenioReducer(state, action);
}

