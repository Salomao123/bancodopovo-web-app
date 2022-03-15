import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ObjetoSelecionavel } from '../../../vo/objeto-selecionavel.vo';
import { ServicoConsignacaoParcela } from '../../../models/servico-consignacao-parcela';
import { getEntityAdapter, BaseEntityState, initialState } from '../../base.reducers.paginator';
import { createReducer, Action, on } from '@ngrx/store';
import * as TaxasParcelasAction from '../actions/taxas-parcelas.actions';

export const adapter: EntityAdapter<ObjetoSelecionavel<ServicoConsignacaoParcela>> =
    createEntityAdapter<ObjetoSelecionavel<ServicoConsignacaoParcela>>({
        selectId: (objeto: ObjetoSelecionavel<ServicoConsignacaoParcela>) => objeto.objeto.id
    });

export interface TaxasParcelasState extends BaseEntityState<ObjetoSelecionavel<ServicoConsignacaoParcela>> {}

export const initialTaxasParcelasState: TaxasParcelasState = initialState(adapter, {});

const initTaxasParcelasReducer = createReducer(
    initialTaxasParcelasState,
    on(TaxasParcelasAction.carregarParcelasTaxasParcelas, (state, {parcelas}) => {
        return adapter.addAll(parcelas.map(p => ({
            selecionado: false,
            objeto: p
        })), state);
    }),
    on(TaxasParcelasAction.selecionarParcelaTaxaParcelas, (state, {idParcela, selecionado}) => {
        return adapter.updateOne({
            id: idParcela,
            changes: {
                ...state.entities[idParcela],
                selecionado
            }
        }, state);
    }),
    on(TaxasParcelasAction.selecionarParcelasTaxasParcelas, (state, {idsParcelas, selecionado}) => {
        const updates = idsParcelas.map((id: number) => ({
            id,
            changes: { ...state.entities[id], selecionado }
        }));

        return adapter.updateMany(updates, state);
    }),
    on(TaxasParcelasAction.selecionarTodasParcelasTaxas, (state, {selecionado}) => {
        const updates = (state as any).ids.map((id) => ({
            id,
            changes: { ...state.entities[id], selecionado }
        }));

        return adapter.updateMany(updates, state);
    }),
    on(TaxasParcelasAction.carregarJurosEncargosTaxasParcelasSucesso, (state, {parcelas}) => {
        const updates = parcelas.map(p => ({
            id: p.id,
            changes: { ...state.entities[p.id], objeto: p }
        }));

        return adapter.updateMany(updates, state);
    }),
    on(TaxasParcelasAction.atualizarParcelasTaxasParcelasSucesso, (state) => {
        return {...initialTaxasParcelasState};
    })
);

export function taxasParcelasReducer(state: TaxasParcelasState | undefined, action: Action) {
    return initTaxasParcelasReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
