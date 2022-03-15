import { createAction, props } from '@ngrx/store';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { VisualizacaoMargem } from '../../../models/visualizacao-margem';
import { SituacaoVisualizacaoMargemEnum } from '../../../enums/situacao.visualizacao.margem';

export const countVisualizacaoMargem = createAction('[Visualizacao Margem] Count',
    props<{ filter: VisualizacaoMargem, afterCount: () => void }>());

export const countVisualizacaoMargemSucesso = createAction('[Visualizacao Margem] Count Sucesso',
    props<{ filter: VisualizacaoMargem, count: number, afterCount: () => void }>());

export const countVisualizacaoMargemErro = createAction('[Visualizacao Margem] Count Erro');

export const pesquisarVisualizacaoMargem = createAction('[Visualizacao Margem] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarVisualizacaoMargemSucesso = createAction('[Visualizacao Margem] Pesquisar Sucesso',
    props<{ registros: VisualizacaoMargem[], page: PageQuery, sort: SortMeta }>());

export const pesquisarVisualizacaoMargemErro = createAction('[Visualizacao Margem] Pesquisar Erro');

export const atualizarSituacaoVisualizacaoMargem = createAction('[Visualizacao Margem] Atualizar Situação',
    props<{ id: number, situacao: SituacaoVisualizacaoMargemEnum }>());

export const atualizarSituacaoVisualizacaoMargemSucesso = createAction('[Visualizacao Margem] Atualizar Situação Sucesso',
    props<{ id: number, situacao: SituacaoVisualizacaoMargemEnum }>());
