import { createAction, props } from '@ngrx/store';
import { Parametro } from '../../../models/parametro';
import { ParametroBoleto } from '../../../models/parametro.boleto';
import { OpcoesParametroBoletoVo } from '../../../vo/opcoes-parametro-boleto.vo';

export const recuperarParametros = createAction('[Parametro] Recuperar Parametros');

export const recuperarParametrosSucesso = createAction('[Parametro] Recuperar Parametros Sucesso',
    props<{ parametro: Parametro }>());

export const recuperarParametrosErro = createAction('[Parametro] Recuperar Parametros Erro');

export const salvarParametros = createAction('[Parametro] Salvar Parametros',
    props<{ parametro: Parametro }>());

export const salvarParametrosSucesso = createAction('[Parametro] Salvar Parametros Sucesso',
    props<{ parametro: Parametro }>());

export const salvarParametroErro = createAction('[Parametro] Salvar Parametro Erro');

export const recuperarParametrosBoleto = createAction('[Parametro] Recuperar Parametros Boleto',
    props<{ after: () => void }>());

export const recuperarParametrosBoletoSucesso = createAction('[Parametro] Recuperar Parametros Boleto Sucesso',
    props<{ parametroBoleto: ParametroBoleto, opcoesBoleto: OpcoesParametroBoletoVo, after: () => void }>());

export const recuperarParametrosBoletoErro = createAction('[Parametro] Recuperar Parametros Boleto Erro');

export const salvarParametroBoleto = createAction('[Parametro] Salvar Parametro Boleto',
    props<{ parametroBoleto: ParametroBoleto, afterSave: () => void }>());

export const salvarParametroBoletoSucesso = createAction('[Parametro] Salvar Parametro Boleto Sucesso',
    props<{ parametroBoleto: ParametroBoleto, afterSave: () => void }>());

export const salvarParametroBoletoErro = createAction('[Parametro] Salvar Parametro Boleto Erro');
