import { createAction, props } from '@ngrx/store';
import { ServicoConsignacao } from '../../../models/servico-consignacao';
import { ServicoConsignacaoParcela } from '../../../models/servico-consignacao-parcela';

export const recuperarServicosConsignacoesAtivosTaxas = createAction('[Taxas] Recuperar Servicos Consignacoes Ativos');

export const recuperarServicosConsignacoesAtivosTaxasSucesso = createAction('[Taxas] Recuperar Servicos Consignacoes Ativos Sucesso',
    props<{ servicosConsignacoes: ServicoConsignacao[] }>());

export const recuperarServicosConsignacoesAtivosTaxasErro = createAction('[Taxas] Recuperar Servicos Consignacoes Ativos Erro');

export const salvarServicoConsignacaoTaxa = createAction('[Taxas] Salvar Servico Consignacao',
    props<{ servico: ServicoConsignacao, afterSalvar: () => void }>());

export const salvarServicoConsignacaoTaxaSucesso = createAction('[Taxas] Salvar Servico Consignacao Sucesso',
    props<{ servico: ServicoConsignacao, afterSalvar: () => void }>());

export const salvarServicoConsignacaoTaxaErro = createAction('[Taxas] Salvar Servico Consignacao Erro');

export const recuperarParcelasServicoConsignacaoTaxa = createAction('[Taxas] Recuperar Parcelas Servico Consignacao',
    props<{ idServicoConsignacao: number, afterConsulta: () => void }>());

export const recuperarParcelasServicoConsignacaoTaxaSucesso = createAction('[Taxas] Recuperar Parcelas Servico Consignacao Sucesso',
    props<{ idServicoConsignacao: number, parcelas: ServicoConsignacaoParcela[], afterConsulta: () => void }>());

export const recuperarParcelasServicoConsignacaoTaxaErro = createAction('[Taxas] Recuperar Parcelas Servico Consignacao Erro');

export const carregarTaxasParcelasServicoConsignacaoTaxa = createAction('[Taxas] Carregar Taxas Servico Consignacao',
    props<{ parcelas: ServicoConsignacaoParcela }>());
