import { EntityAdapter } from '@ngrx/entity';
import { Proposta } from '../../../models/proposta';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, upsertOnState } from '../../base.reducers.paginator';
import { createReducer, on, Action } from '@ngrx/store';
import * as ConsignacaoActions from '../actions/consignacao.actions';
import { SituacaoPropostaEnum } from 'src/app/enums/situacao.proposta';
import { EmpregadoConsignante } from '../../../models/empregado-consignante';

export const adapter: EntityAdapter<Proposta> = getEntityAdapter<Proposta>();

export interface ConsignacaoState extends BaseEntityState<Proposta> {
    consignados: EmpregadoConsignante[];
    proposta: Proposta;
}

export const initialConsignacaoState: ConsignacaoState = initialState(adapter, {
    consignados: undefined,
    proposta: undefined
});

const initConsignacaoReducer = createReducer(
    initialConsignacaoState,
    on(ConsignacaoActions.recuperarConsignadosPropostaConsignacaoSucesso, (state, {consignados}) => {
        return {...initialConsignacaoState, consignados};
    }),
    on(ConsignacaoActions.countConsignacaoSucesso, (state, {filter, count}) => {
        return {...initialConsignacaoState, filter, count, consignados: (state as ConsignacaoState).consignados};
    }),
    on(ConsignacaoActions.countConsignacaoErro, (state) => ({...initialConsignacaoState})),
    on(ConsignacaoActions.pesquisarConsignacaoSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(ConsignacaoActions.pesquisarConsignacaoErro, (state) => ({...initialConsignacaoState})),
    on(ConsignacaoActions.detalharPropostaConsignacaoSucesso, (state, {proposta}) => {
        return {...state, proposta};
    }),
    on(ConsignacaoActions.salvarAlteracaoPropostaConsignacaoSucesso, (state, {proposta}) => {
        const id = proposta.id;

        return adapter.updateOne({
            id,
            changes: {...state.entities[id],
                valorParcela: proposta.valorParcela,
                parcelas: proposta.parcelas,
                mesAnoInicio: proposta.mesAnoInicio,
                mesAnoFim: proposta.mesAnoFim
            }
        }, state);
    }),
    on(ConsignacaoActions.salvarEncerramentoPropostaConsignacaoSucesso, (state, {id}) => {
        return adapter.updateOne({
            id,
            changes: {
                ...state.entities[id],
                situacao: SituacaoPropostaEnum.ENCERRADA
            }
        }, state);
    }),
    on(ConsignacaoActions.salvarRenovacaoPropostaConsignacaoSucesso, (state, {proposta, idsPropostasRenovadas}) => {
        const propostas = new Array();

        idsPropostasRenovadas.forEach(id => {
            const pr = Object.assign({}, state.entities[id]);
            pr.situacao = SituacaoPropostaEnum.RENOVADA;
            propostas.push(pr);
        });

        return upsertOnState(adapter, adapter.upsertMany(propostas, state), proposta, true);
    }),
    on(ConsignacaoActions.salvarSuspensaoPropostaConsignacaoSucesso, (state, {id}) => {
        return adapter.updateOne({
            id,
            changes: {
                ...state.entities[id],
                situacao: SituacaoPropostaEnum.SUSPENSA
            }
        }, state);
    }),
    on(ConsignacaoActions.salvarCancelamentoSuspensaoPropostaConsignacaoSucesso, (state, {id}) => {
        return adapter.updateOne({
            id,
            changes: {
                ...state.entities[id],
                situacao: SituacaoPropostaEnum.ATIVA
            }
        }, state);
    })
);

export function consignacaoReducer(state: ConsignacaoState | undefined, action: Action) {
    return initConsignacaoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
