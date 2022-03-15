import { StatusRegistroEnum } from '../enums/status.registro';
import { TipoPessoaEnum } from '../enums/tipo.pessoa';
import { TipoTaxaEnum } from '../enums/tipo.taxa';
import { Pessoa } from '../models/pessoa';

export class LinhaCredito {

    id: number;
	status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    nome: String;

    descricao: String;
    taxa: number;
    taxaFormatada: string;
    taxaMinima: number;
    taxaMinimaFormatada: string;
    taxaMaxima: number;
    taxaMaximaFormatada: string;
    valorMinimo: number;
    valorMinimoFormatado: string;
    valorMaximo: number;
    valorMaximoFormatado: string;
    parcelasMinima: number;
    parcelasMaxima: number;
    tipoTaxa: TipoTaxaEnum;
    tipoPessoa: TipoPessoaEnum;
    carenciaDias: number;
    indicadorCobrancaCarencia: number;

}