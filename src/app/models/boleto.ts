import { SituacaoBoletoEnum } from '../enums/situacao.boleto';
import { Empresa } from './empresa';
import { EmpresaConsignataria } from './empresa-consignataria';

export class Boleto {

    id: number;
	nossoNumero: string;
	numeroDocumento: string;
	dataVencimento: Date;
	valor: number;
	dataEmissao: Date;
	dataJuros: Date;
	valorJuros: number;
	dataMulta: Date;
	valorMulta: number;
	dataDescontoUm: Date;
	valorDescontoUm: number;
	dataDescontoDois: Date;
	valorDescontoDois: number;
	dataDescontoTres: Date;
	valorDescontoTres: number;
	valorIof: number;
	valorAbatimento: number;
	mensagem: string;
	idParcela: number;
	situacao: SituacaoBoletoEnum;
	erro: string;
	descricaoErro: string;
    tipoDocumentoPagador: number;
	documentoPagador: number;
	nomePagador: string;
	enderecoPagador: string;
	bairroPagador: string;
	cepPagador: string;
	cidadePagador: string;
	ufPagador: string;
	movimento: string;
	descMovimento: string;
	ocorrencias: string;
	descOcorrencias: string;
	idArquivoRemessa: number;
	idArquivoRetorno: number;
	codigoBarras: string;
	linhaDigitavel: string;

    valorFormatado: string;
	valorJurosFormatado: string;
    valorMultaFormatado: string;
    valorDescontoUmFormatado: string;
	valorDescontoDoisFormatado: string;
	valorDescontoTresFormatado: string;
	valorIofFormatado: string;
	valorAbatimentoFormatado: string;
    
}
