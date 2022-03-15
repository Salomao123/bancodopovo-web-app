import { createAction, props } from '@ngrx/store';
import { Emprestimo } from '../../../models/emprestimo';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';

export const countEmprestimo = createAction('[Emprestimo] Count',
    props<{ filter: Emprestimo, afterCount: () => void }>());

export const countEmprestimoSucesso = createAction('[Emprestimo] Count Sucesso',
    props<{ filter: Emprestimo, count: number, afterCount: () => void }>());

export const countEmprestimoErro = createAction('[Emprestimo] Count Erro');

export const pesquisarEmprestimo = createAction('[Emprestimo] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarEmprestimoSucesso = createAction('[Emprestimo] Pesquisar Sucesso',
    props<{ registros: Emprestimo[], page: PageQuery, sort: SortMeta }>());

export const pesquisarEmprestimoErro = createAction('[Emprestimo] Pesquisar Erro');

export const salvarEmprestimo = createAction('[Emprestimo] Salvar',
    props<{ registro: Emprestimo, afterSave: () => void }>());

export const salvarEmprestimoSucesso = createAction('[Emprestimo] Salvar Sucesso',
    props<{ registro: Emprestimo, insert: boolean }>());

export const atualiarStatusEmprestimo = createAction('[Emprestimo] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusEmprestimoSucesso = createAction('[Emprestimo] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());
