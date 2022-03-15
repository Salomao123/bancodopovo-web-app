import { createAction, props } from '@ngrx/store';
import { VisualizacaoMargem } from '../../../models/visualizacao-margem';
import { ServicoConsignacao } from '../../../models/servico-consignacao';
import { Proposta } from '../../../models/proposta';

export const consultarMargem = createAction('[Margem] Consultar',
    props<{ cpf: string }>());

export const consultarMargemSucesso = createAction('[Margem] Consulta Sucesso',
    props<{ margem: VisualizacaoMargem }>());

export const consultarMargemErro = createAction('[Margem] Consulta Erro');

export const solicitarConsultaMargem = createAction('[Margem] Solicitar Consulta',
    props<{ margem: VisualizacaoMargem, afterSolicitar: () => void }>());

export const solicitarConsultaMargemSucesso = createAction('[Margem] Solicitar Consulta Sucesso',
    props<{ margem: VisualizacaoMargem, afterSolicitar: () => void }>());

export const solicitarConsultaMargemErro = createAction('[Margem] Solicitar Consulta Erro');

export const limparMargemConsulta = createAction('[Margem] limpar consulta ');

export const recuperarServicosConsignacaoAtivosConsultaMargem = createAction('[Margem] Recuperar Servicos Consignacao Ativos');

export const recuperarServicosConsignacaoAtivosConsultaMargemSucesso =
    createAction('[Margem] Recuperar Servicos Consignacao Ativos Sucesso', props<{ servicos: ServicoConsignacao[] }>());

export const salvarPropostaConsultaMargem = createAction('[Margem] Salvar Proposta',
    props<{ proposta: Proposta, afterSave: () => void }>());

export const salvarPropostaConsultaMargemSucesso = createAction('[Margem] Salvar Proposta Sucesso');

export const salvarPropostaConsultaMargemErro = createAction('[Margem] Salvar Proposta Erro');
