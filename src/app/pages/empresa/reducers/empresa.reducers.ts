import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as EmpresaActions from '../actions/empresa.actions';
import { Empresa } from '../../../models/empresa';
import { Pessoa } from '../../../models/pessoa';
import { PageQuery, SortMeta, PageQueryRegs } from '../../../util/pagination';

export const adapter: EntityAdapter<Empresa> = createEntityAdapter<Empresa>();

export interface EmpresaState extends EntityState<Empresa> {
    filter: Empresa;
    count: number;
    pessoasJuridicas: Pessoa[];

    // paginacao
    page: PageQuery;
    sort: SortMeta;
    pagesRegs: Array<PageQueryRegs>;
}

export const initialEmpresaState: EmpresaState = adapter.getInitialState({
    filter: undefined,
    count: 0,
    pessoasJuridicas: undefined,
    entities: [],

    page: undefined,
    sort: undefined,
    pagesRegs: [],
});

const initEmpresaReducer = createReducer(
    initialEmpresaState,
    on(EmpresaActions.countEmpresaSucesso, (state, {filter, count}) => {
        const pessoasJuridicas = state.pessoasJuridicas;
        return {...initialEmpresaState, filter, count, pessoasJuridicas };
    }),
    on(EmpresaActions.countEmpresaErro, (state) => ({...initialEmpresaState})),
    on(EmpresaActions.pesquisarEmpresaSucesso, (state, {empresas, page, sort}) => {
        const pageReg = {
            page: page.first,
            registros: empresas.map(e => e.id)
        };

        if ((state.sort) && sort.field === state.sort.field && sort.order === state.sort.order) {
            return adapter.addMany(empresas, {...state, page, sort,
                pagesRegs: (state.pagesRegs.find(e => e.page === page.first)) ? [...state.pagesRegs] : [...state.pagesRegs, pageReg]});
        } else {
            return adapter.addAll(empresas, {...state, page, sort, pagesRegs: [pageReg]});
        }
    }),
    on(EmpresaActions.salvarEmpresaSucesso, (state, {empresa, insert}) => {
        const count = (insert) ? state.count + 1 : state.count; // se for insert aumenta mais um registro no contador
        return adapter.upsertOne(empresa, {...state, count});
    }),
    on(EmpresaActions.atualizarStatusEmpresaSucesso, (state, {id, status}) => {
        return adapter.updateOne({
            id,
            changes: {...state.entities[id], status}
        }, state);
    }),
    on(EmpresaActions.consultarPessoasJuriticasSucesso, (state, {pessoasJuridicas}) => {
        return { ...state, pessoasJuridicas };
    })
);

export function empresaReducer(state: EmpresaState | undefined, action: Action) {
    return initEmpresaReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
