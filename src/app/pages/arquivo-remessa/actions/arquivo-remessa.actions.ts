import { createAction, props } from '@ngrx/store';
import { ArquivoRemessa } from '../../../models/arquivo-remessa';
import { PageQuery, SortMeta } from '../../../util/pagination';

export const countArquivoRemessa = createAction(
    '[Arquivo Remessa] Count',
    props<{ filter: ArquivoRemessa, afterCount: () => void }>()
);

export const countArquivoRemessaSucesso = createAction(
    '[Arquivo Remessa] Count Sucesso',
    props<{ filter: ArquivoRemessa, count: number, afterCount: () => void }>()
);

export const countArquivoRemessaErro = createAction(
    '[Arquivo Remessa] Count Erro'
);

export const pesquisarArquivoRemessa = createAction(
    '[Arquivo Remessa] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>()
);

export const pesquisarArquivoRemessaSucesso = createAction(
    '[Arquivo Remessa] Pesquisar Sucesso',
    props<{ registros: ArquivoRemessa[], page: PageQuery, sort: SortMeta }>()
);

export const pesquisarArquivoRemessaErro = createAction(
    '[Arquivo Remessa] Pesquisar Erro'
);

export const enviarArquivoRetorno = createAction(
    '[Arquivo Remessa] Enviar Arquivo Retorno',
    props<{ file: File, afterEnvio: () => void }>()
);

export const enviarArquivoRetornoSucesso = createAction(
    '[Arquivo Remessa] Enviar Arquivo Retorno Sucesso',
    props<{ arquivoRemessa: ArquivoRemessa, afterEnvio: () => void }>()
);

export const enviarArquivoRetornoErro = createAction(
    '[Arquivo Remessa] Enviar Arquivo Retorno Erro'
);

export const gerarArquivoRemessa = createAction(
    '[Arquivo Remessa] Gerar Arquivo Remessa',
    props<{ afterDownload: (arquivo: any, nome: string) => void }>()
);

export const gerarArquivoRemessaSucesso = createAction(
    '[Arquivo Remessa] Gerar Arquivo Remessa Sucesso'
);

export const gerarArquivoRemessaErro = createAction(
    '[Arquivo Remessa] Gerar Arquivo Remessa Erro'
);
