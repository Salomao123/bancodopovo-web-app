import { createAction, props } from '@ngrx/store';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { Proposta } from '../../../models/proposta';
import { PropostaRenovacaoVo } from '../../../vo/proposta-renovacao.vo';
import { EmpregadoConsignante } from '../../../models/empregado-consignante';

export const recuperarConsignadosPropostaConsignacao = createAction('[Consignacao] Recuperar Consignados Proposta',
    props<{ filter: Proposta, afterConsulta: (consignado: EmpregadoConsignante) => void }>());

export const recuperarConsignadosPropostaConsignacaoSucesso = createAction('[Consignacao] Recuperar Consignados Proposta Sucesso',
    props<{ consignados: EmpregadoConsignante[], afterConsulta: (consignado: EmpregadoConsignante) => void }>());

export const countConsignacao = createAction('[Consignacao] Count',
    props<{ filter: Proposta, afterCount: () => void }>());

export const countConsignacaoSucesso = createAction('[Consignacao] Count Sucesso',
    props<{ filter: Proposta, count: number, afterCount: () => void }>());

export const countConsignacaoErro = createAction('[Consignacao] Count Erro');

export const pesquisarConsignacao = createAction('[Consignacao] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarConsignacaoSucesso = createAction('[Consignacao] Pesquisar Sucesso',
    props<{ registros: Proposta[], page: PageQuery, sort: SortMeta }>());

export const pesquisarConsignacaoErro = createAction('[Consignacao] Pesquisar Erro');

export const detalharPropostaConsignacao = createAction('[Consignacao] Detalhar Proposta',
    props<{ id: number, afterDetalhar: () => void }>());

export const detalharPropostaConsignacaoSucesso = createAction('[Consignacao] Detalhar Proposta Sucesso',
    props<{ proposta: Proposta, afterDetalhar: () => void }>());

export const detalharPropostaConsignacaoErro = createAction('[Consignacao] Detalhar Proposta Erro');

export const salvarAlteracaoPropostaConsignacao = createAction('[Consignacao] Salvar Alteracao Proposta',
    props<{ proposta: Proposta, afterSalvar: () => void }>());

export const salvarAlteracaoPropostaConsignacaoSucesso = createAction('[Consignacao] Salvar Alteracao Proposta Sucesso',
    props<{ proposta: Proposta, afterSalvar: () => void }>());

export const salvarAlteracaoPropostaConsignacaoErro = createAction('[Consignacao] Salvar Alteracao Proposta Erro');

export const salvarEncerramentoPropostaConsignacao = createAction('[Consignacao] Salvar Encerramento Proposta',
    props<{ id: number, file: File, afterSalvar: () => void }>());

export const salvarEncerramentoPropostaConsignacaoSucesso = createAction('[Consignacao] Salvar Encerramento Proposta Sucesso',
    props<{ id: number,  afterSalvar: () => void }>());

export const salvarEncerramentoPropostaConsignacaoErro = createAction('[Consignacao] Salvar Encerramento Proposta Erro');

export const salvarRenovacaoPropostaConsignacao = createAction('[Consignacao] Salvar Renovacao Proposta',
    props<{ propostaRenovacaoVo: PropostaRenovacaoVo, file: File, afterSalvar: () => void }>());

export const salvarRenovacaoPropostaConsignacaoSucesso = createAction('[Consignacao] Salvar Renovacao Proposta Sucesso',
    props<{ proposta: Proposta, idsPropostasRenovadas: number[], afterSalvar: () => void }>());

export const salvarRenovacaoPropostaConsignacaoErro = createAction('[Consignacao] Salvar Renovacao Proposta Erro');

export const salvarSuspensaoPropostaConsignacao = createAction('[Consignacao] Salvar Suspensao Proposta',
    props<{ proposta: Proposta, file: File, afterSalvar: () => void }>());

export const salvarSuspensaoPropostaConsignacaoSucesso = createAction('[Consignacao] Salvar Suspensao Proposta Sucesso',
    props<{ id: number, afterSalvar: () => void }>());

export const salvarSuspensaoPropostaConsignacaoErro = createAction('[Consignacao] Salvar Suspensao Proposta Erro');

export const salvarCancelamentoSuspensaoPropostaConsignacao = createAction('[Consignacao] Salvar Cancelamento Suspensao Proposta',
    props<{ proposta: Proposta, file: File, afterSalvar: () => void }>());

export const salvarCancelamentoSuspensaoPropostaConsignacaoSucesso = createAction(
    '[Consignacao] Salvar Cancelamento Suspensao Proposta Sucesso',
    props<{ id: number, afterSalvar: () => void }>());

export const salvarCancelamentoSuspensaoPropostaConsignacaoErro = createAction('[Consignacao] Salvar Cancelamento Suspensao Proposta Erro');
