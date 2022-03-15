import { Acao } from '../../../models/acao';
import { Funcionalidade } from '../../../models/funcionalidade';
import { createReducer, on, Action } from '@ngrx/store';
import * as PerfilFuncionalidadesAction from '../actions/perfil-funcionalidades.action';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { PerfilFuncionalidadeAcao } from '../../../models/perfil-funcionalidade-acao';
import { PageQuery, SortMeta, PageQueryRegs } from '../../../util/pagination';

export const adapter: EntityAdapter<PerfilFuncionalidadeAcao> = createEntityAdapter<PerfilFuncionalidadeAcao>();

export interface PerfilFuncionalidadesState extends EntityState<PerfilFuncionalidadeAcao> {
    filter: PerfilFuncionalidadeAcao;
    count: number;
    page: PageQuery;
    sort: SortMeta;
    pagesRegs: Array<PageQueryRegs>;

    funcionalidades: Array<Funcionalidade>;
    acoes: Array<Acao>;
}

export const initialPerfilFuncionalidadesState: PerfilFuncionalidadesState = adapter.getInitialState({
    filter: undefined,
    count: 0,
    page: undefined,
    sort: undefined,
    pagesRegs: [],
    entities: [],

    funcionalidades: undefined,
    acoes: undefined
});

const initPerfilFuncionalidadesReducer = createReducer(
    initialPerfilFuncionalidadesState,
    on(PerfilFuncionalidadesAction.recuperarFuncionalidadesAtivasSucesso, (state, {funcionalidades}) => {
        return {...state, funcionalidades: (funcionalidades) ? funcionalidades : state.funcionalidades};
    }),
    on(PerfilFuncionalidadesAction.recuperarAcoesNaoVinculadasSucesso, (state, {acoes}) => {
        return {...state, acoes};
    }),
    on(PerfilFuncionalidadesAction.countPerfilFuncionalidadeAcaoSucesso, (state, {filter, count}) => {
        return {...initialPerfilFuncionalidadesState, filter, count, funcionalidades: state.funcionalidades, acoes: state.acoes};
    }),
    on(PerfilFuncionalidadesAction.countPerfilFuncionalidadeAcaoErro, (state) => ({...initialPerfilFuncionalidadesState})),
    on(PerfilFuncionalidadesAction.pesquisarPerfilFuncionalidadeAcaoSucesso, (state, {perfisFuncionalidadesAcoes, page, sort}) => {
        const pageReg = {
            page : page.first,
            registros: perfisFuncionalidadesAcoes.map(p => p.id)
        };

        if ((state.sort) && sort.field === state.sort.field && sort.order === state.sort.order) {
            return adapter.addMany(perfisFuncionalidadesAcoes, {...state, page, sort,
                pagesRegs: (state.pagesRegs.find(e => e.page === page.first)) ? [...state.pagesRegs] : [...state.pagesRegs, pageReg]});
        } else {
            return adapter.addAll(perfisFuncionalidadesAcoes, {...state, page, sort, pagesRegs: [pageReg]});
        }
    }),
    on(PerfilFuncionalidadesAction.salvarPerfilFuncionalidadeAcaoSucesso, (state, {perfis}) => {
        // limpar acoes
        const acoesNaoSalvar = state.acoes.filter(a => perfis.filter(p => p.funcionalidadeAcao.id.idAcao === a.id).length === 0);

        // ajustar contador
        const count = state.count + perfis.length;
        return {...state, acoes: acoesNaoSalvar, count, pagesRegs: []};
    }),
    on(PerfilFuncionalidadesAction.atualizarStatusPerfilFuncionalidadeAcaoSucesso, (state, {id, status}) => {
        return adapter.updateOne({
            id,
            changes: {...state.entities[id], status}
        }, state);
    })
);

export function perfilFuncionalidadesReducer(state: PerfilFuncionalidadesState | undefined, action: Action) {
    return initPerfilFuncionalidadesReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
