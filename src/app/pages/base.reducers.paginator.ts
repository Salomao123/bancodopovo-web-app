import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { PageQuery, SortMeta, PageQueryRegs } from '../util/pagination';
import { StatusRegistroEnum } from '../enums/status.registro';
import { StatusEventoEnum } from '../enums/status.evento';
import { StatusLevantamentoEnum } from '../enums/status.levantamento';

export const getEntityAdapter = <T>() => createEntityAdapter<T>();

export interface BaseEntityState<T> extends EntityState<T> {
    filter: T;
    count: number;
    page: PageQuery;
    sort: SortMeta;
    pagesRegs: Array<PageQueryRegs>;
}

export const initialState = <T>(adapter: EntityAdapter<T>, customState: any) => {
    const objInitialState: any = {
        filter: undefined,
        count: 0,
        page: undefined,
        sort: undefined,
        pagesRegs: [],
        entities: [],
    };

    return adapter.getInitialState({...objInitialState, ...customState});
};

/**
 * Utilizado para atualizar os registros paginados no state que extende de BaseEntityState.
 * Por enquanto para funcionar corretamento, o tipo genérico para o state deve possuir o atributo "id" definido.
 */
export const loadRegsOnState = <T>(adapter: EntityAdapter<T>, state: BaseEntityState<T>, page: PageQuery, sort: SortMeta, regs: any[]) => {
    const pageReg = {
        page: page.first,
        registros: regs.map(r => r.id)
    };

    if ((state.sort) && sort.field === state.sort.field && sort.order === state.sort.order) {
        return adapter.addMany(regs, {...state, page, sort,
            pagesRegs: (state.pagesRegs.find(e => e.page === page.first)) ? [...state.pagesRegs] : [...state.pagesRegs, pageReg]});
    } else {
        return adapter.addAll(regs, {...state, page, sort, pagesRegs: [pageReg]});
    }
};

export const currentPageToInsert = <T>(state: BaseEntityState<T>, page: PageQuery) => {
    const pageReg = (state as any).pagesRegs.filter(pr => pr.page === page.first);
    return (pageReg.length > 0) ? pageReg[0] : undefined;
};

export const updatePageRegsToInsert = <T>(state: BaseEntityState<T>, pageReg: PageQueryRegs) => {
    const newPageRegs = state.pagesRegs.filter(pr => pr.page !== pageReg.page);
    return [newPageRegs, pageReg];
};

export const upsertOnState = <T>(adapter: EntityAdapter<T>, state: BaseEntityState<T>, registro: T, insert: boolean) => {

    if (insert) { // No caso de ser uma inclusao
        const count = state.count + 1;
        const page = Object.assign({}, state.page);
        const pageReg: PageQueryRegs = Object.assign({}, currentPageToInsert(state, page));

        if (!pageReg.registros) { // Para inserir caso não tenha nenhum registro sendo apresentado em tela.
            pageReg.registros = [[], (registro as any).id];
            return adapter.upsertOne(registro, {...state, count, pagesRegs: updatePageRegsToInsert(state, pageReg), 
                page: {first: 0, max: 5} });

        } else if (pageReg.registros.length < page.max) { // Para inserir caso tenha registros em tela, porém menos que o maximo em tela.
            // pageReg.registros.push((registro as any).id);
            pageReg.registros = [...pageReg.registros, (registro as any).id];
            return adapter.upsertOne(registro, {...state, count, pagesRegs: updatePageRegsToInsert(state, pageReg) });

        } else {
            return {...state, count};
        }
    }
    // No caso de ser somente update
    return adapter.upsertOne(registro, {...state});
};

/**
 * Utilizado para atualizar o status de um registro especifico base nas seguintes premissas:
 *  - O estado deve extender de EntityState do NGRX;
 *  - O status do modelo deve ser do tipo enum "StatusRegistroEnum";
 */
export const updateRegStatus = <T>(adapter: EntityAdapter<T>, state: EntityState<T>, id: any, status: StatusRegistroEnum) => {
    return adapter.updateOne({
        id,
        changes: {...state.entities[id], status}
    }, state);
};

/**
 * Utilizado para atualizar o status de um registro especifico base nas seguintes premissas:
 *  - O estado deve extender de EntityState do NGRX;
 *  - O status do modelo deve ser do tipo enum "StatusEventoEnum";
 */
export const updateRegStatusEvento = <T>(adapter: EntityAdapter<T>, state: EntityState<T>, id: any, status: StatusEventoEnum) => {
    return adapter.updateOne({
        id,
        changes: {...state.entities[id], status}
    }, state);
};

/**
 * Utilizado para atualizar o status de um registro especifico base nas seguintes premissas:
 *  - O estado deve extender de EntityState do NGRX;
 *  - O status do modelo deve ser do tipo enum "StatusLevantamentoEnum";
 */
export const updateRegStatusLevantamento = <T>(adapter: EntityAdapter<T>, state: EntityState<T>, id: any, status: StatusLevantamentoEnum) => {
    return adapter.updateOne({
        id,
        changes: {...state.entities[id], status}
    }, state);
};
