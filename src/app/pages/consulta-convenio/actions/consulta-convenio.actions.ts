import { createAction, props } from '@ngrx/store';
import { Convenio } from '../../../models/convenio';
import { ConvenioVo } from '../../../vo/convenio.vo';

export const consultarConvenio = createAction('[Consulta Convenio] consultar',
    props<{ cnpj: string }>());

export const consultarConvenioSucesso = createAction('[Consulta Convenio] consultar sucesso',
    props<{ convenio: ConvenioVo }>());

export const consultarConvenioErro = createAction('[Consulta Convenio] consultar erro');
