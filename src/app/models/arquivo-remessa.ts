import { SituacaoArquivoRemessaEnum } from '../enums/situacao.arquivo.remessa';
import { TipoArquivoRemessaEnum } from '../enums/tipo.arquivo.remessa';

export class ArquivoRemessa {

    id: number;
    nome: string;
    dataCriaca: Date;
    dataProcessamento: Date;
    situacao: SituacaoArquivoRemessaEnum;
    tipo: TipoArquivoRemessaEnum;
    idUsuario: number;

    // Filtro
    periodoInicial: Date;
    periodoFinal: Date;

}
