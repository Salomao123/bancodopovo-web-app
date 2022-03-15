import { createAction, props } from '@ngrx/store';
import { Uf } from '../../../models/uf';
import { Cidade } from '../../../models/cidade';
import { Endereco } from '../../../models/endereco';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';


export const countEndereco = createAction('[Endereco] Count',
    props<{ filter: Endereco, afterCount: () => void }>());

export const countEnderecoSucesso = createAction('[Endereco] Count Sucesso',
    props<{ filter: Endereco, count: number, afterCount: () => void }>());

export const countEnderecoErro = createAction('[Endereco] Count Erro');

export const pesquisarEndereco = createAction('[Endereco] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarEnderecoSucesso = createAction('[Endereco] Pesquisar Sucesso',
    props<{ registros: Endereco[], page: PageQuery, sort: SortMeta }>());

export const pesquisarEnderecoErro = createAction('[Endereco] Pesquisar Erro');

export const carreagarDependenciasEndereco = createAction('[Endereco] Carregar Dependencias',
    props<{ registro: Endereco, afterSave: () => void }>());

export const salvarEndereco = createAction('[Endereco] Salvar',
    props<{ registro: Endereco, afterSave: () => void }>());

export const salvarEnderecoSucesso = createAction('[Endereco] Salvar Sucesso',
    props<{ registro: Endereco, insert: boolean }>());

export const salvarEnderecoErro = createAction('[Endereco] Salvar Erro');

export const atualizarStatusEndereco = createAction('[Endereco] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusEnderecoSucesso = createAction('[Endereco] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusEnderecoErro = createAction('[Endereco] Atualizar Status Erro');






export const listarUfEndereco = createAction('[Endereco] Listar UF');

export const listarUfEnderecoSucesso = createAction('[Endereco] Listar UF Sucesso',
    props<{ ufs: Uf[] }>());

export const listarUfEnderecoErro = createAction('[Endereco] Listar UF Erro');

export const listarCidadeEndereco = createAction('[Endereco] Listar Cidade',
    props<{ idUf: number }>());

export const listarCidadeEnderecoSucesso = createAction('[Endereco] Listar Cidade Sucesso',
    props<{ idUf: number, cidades: Cidade[] }>());

export const listarCidadeEnderecoErro = createAction('[Endereco] Listar Cidade Erro');
