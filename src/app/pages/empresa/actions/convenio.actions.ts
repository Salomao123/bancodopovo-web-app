import { createAction, props } from '@ngrx/store';
import { Convenio } from '../../../models/convenio';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { EmpresaConsignataria } from '../../../models/empresa-consignataria';
import { SituacaoConvenioEnum } from '../../../enums/situacao.convenio';

export const countConvenio = createAction('[Convenio] Count',
    props<{ filter: Convenio, afterCount: () => void }>());

export const countConvenioSucesso = createAction('[Convenio] Count Sucesso',
    props<{ filter: Convenio, count: number, afterCount: () => void }>());

export const countConvenioErro = createAction('[Convenio] Count Erro');

export const pesquisarConvenio = createAction('[Convenio] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarConvenioSucesso = createAction('[Convenio] Pesquisar Sucesso',
    props<{ registros: Convenio[], page: PageQuery, sort: SortMeta }>());

export const pesquisarConvenioErro = createAction('[Convenio] Pesquisar Erro');

export const carreagarDependenciasConvenio = createAction('[Convenio] Carregar Dependencias',
    props<{ registro: Convenio, afterSave: () => void }>());

export const salvarConvenio = createAction('[Convenio] Salvar',
    props<{ registro: Convenio, afterSave: () => void }>());

export const salvarConvenioSucesso = createAction('[Convenio] Salvar Sucesso',
    props<{ registro: Convenio, insert: boolean }>());

export const consultarEmpresasConsignatariasConvenio = createAction('[Convenio] Consultar Empresas Consignatarias');

export const consultarEmpresasConsignatariasConvenioSucesso = createAction('[Convenio] Consultar Empresas Consignatarias Sucesso',
    props<{ empresasConsignatarias: EmpresaConsignataria[] }>());

export const atualizarStatusConvenio = createAction('[Convenio] Atualizar Status',
    props<{ id: number, situacao: SituacaoConvenioEnum }>());

export const atualizarStatusConvenioSucesso = createAction('[Convenio] Atualizar Status Sucesso',
    props<{ id: number, situacao: SituacaoConvenioEnum }>());
