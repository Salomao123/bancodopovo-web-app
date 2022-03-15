import { EntityAdapter } from '@ngrx/entity';
import { ServicoConsignacao } from '../../../models/servico-consignacao';
import { getEntityAdapter, BaseEntityState, initialState } from '../../base.reducers.paginator';
import { createReducer, on, Action } from '@ngrx/store';
import * as TaxasActions from '../actions/taxax.actions';
import * as TaxasParcelasActions from '../actions/taxas-parcelas.actions';
import { ServicoConsignacaoParcelasVo } from '../../../vo/servico-consignacao-parcelas.vo';

export const adapter: EntityAdapter<ServicoConsignacao> = getEntityAdapter<ServicoConsignacao>();

export interface TaxasState extends BaseEntityState<ServicoConsignacao> {
    idServicoSelecionado: number;
    servicoParcelas: ServicoConsignacaoParcelasVo[];
}

export const initialTaxasState: TaxasState = initialState(adapter, {
    idServicoSelecionado: undefined,
    servicoParcelas: undefined,
});

const initTaxasReducer = createReducer(
    initialTaxasState,
    on(TaxasActions.recuperarServicosConsignacoesAtivosTaxasSucesso, (state, {servicosConsignacoes}) => {
        return adapter.upsertMany(servicosConsignacoes, state);
    }),
    on(TaxasActions.salvarServicoConsignacaoTaxaSucesso, (state, {servico}) => {
        const id = servico.id;
        return adapter.updateOne({
            id,
            changes: {
                ...state.entities[id],
                juros: servico.juros,
                encargos: servico.encargos
            }
        }, state);
    }),
    on(TaxasActions.recuperarParcelasServicoConsignacaoTaxa, (state, {idServicoConsignacao}) => {
        return {...state, idServicoSelecionado: idServicoConsignacao};
    }),
    on(TaxasActions.recuperarParcelasServicoConsignacaoTaxaSucesso, (state, {idServicoConsignacao, parcelas}) => {
        const servicosParcelas = (state.servicoParcelas) ? state.servicoParcelas : [];
        const servicoParcela = servicosParcelas.filter(sp => sp.idServicoConsignacao === idServicoConsignacao);

        return (servicoParcela && servicoParcela.length > 0) ? {...state} : {...state,
            servicoParcelas: [...servicosParcelas, {idServicoConsignacao, parcelas}]};
    }),
    on(TaxasParcelasActions.atualizarParcelasTaxasParcelasSucesso, (state, {parcelas}) => {
        const idServicoConsignacao = state.idServicoSelecionado;

        const servicos = Object.assign([], (state as TaxasState).servicoParcelas
            .filter(sp => sp.idServicoConsignacao !== idServicoConsignacao));

        return {...state, idServicoSelecionado: undefined, servicoParcelas: [...servicos, { idServicoConsignacao, parcelas }]};
    })
);

export function taxasReducer(state: TaxasState | undefined, action: Action) {
    return initTaxasReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
