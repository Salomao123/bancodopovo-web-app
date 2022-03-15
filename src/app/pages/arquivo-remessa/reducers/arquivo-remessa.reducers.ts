import { EntityAdapter } from '@ngrx/entity';
import { ArquivoRemessa } from '../../../models/arquivo-remessa';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, upsertOnState } from '../../base.reducers.paginator';
import { createReducer, on, Action } from '@ngrx/store';
import * as ArquivoRemessaActions from '../actions/arquivo-remessa.actions';

export const adapter: EntityAdapter<ArquivoRemessa> = getEntityAdapter<ArquivoRemessa>();

export interface ArquivoRemessaState extends BaseEntityState<ArquivoRemessa> { }

export const initialArquivoRemessaState: ArquivoRemessaState = initialState(adapter, {});

const initArquivoRemessaReducer = createReducer(
    initialArquivoRemessaState,
    on(ArquivoRemessaActions.countArquivoRemessaSucesso, (state, { filter, count }) => {
        return {...initialArquivoRemessaState, filter, count};
    }),
    on(ArquivoRemessaActions.countArquivoRemessaErro, (state) => ({...initialArquivoRemessaState})),
    on(ArquivoRemessaActions.pesquisarArquivoRemessaSucesso, (state, { registros, page, sort }) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(ArquivoRemessaActions.enviarArquivoRetornoSucesso, (state, { arquivoRemessa }) => {
        return upsertOnState(adapter, state, arquivoRemessa, true);
    })
);

export function arquivoRemessaReducer(state: ArquivoRemessaState | undefined, action: Action) {
    return initArquivoRemessaReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
