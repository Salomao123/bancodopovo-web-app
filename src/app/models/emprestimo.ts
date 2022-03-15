import { StatusRegistroEnum } from '../enums/status.registro';
import { Pessoa } from '../models/pessoa';
import { Usuario } from '../models/usuario';
import { Levantamento } from '../models/levantamento';
import { LinhaCredito } from '../models/linha-credito';

export class Emprestimo {

    id: number;
    nome: string;
	status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;

    dataEmprestimo: Date;
    valorParcela: number;
    valorSolicitado: number;
    valorFinal: number;
    saldoDevedor: number;
    taxaAnual: number;
    taxaMensal: number;
    numeroParcelas: number;
    qtdRenegociacoes: number;
    taxaAnualRenegociacao1: number;
    taxaMensalRenegociacao1: number;
    taxaAnualRenegociacao2: number;
    taxaMensalRenegociacao2: number;
    taxaAnualRenegociacao3: number;
    taxaMensalRenegociacao3: number;
    motivoRenegociacao1: string;
    motivoRenegociacao2: string;
    motivoRenegociacao3: string;

    dataRenegociacao1: Date;
    dataRenegociacao2: Date;
    dataRenegociacao3: Date;

    usuarioRenegociacao1: Usuario;
    usuarioRenegociacao2: Usuario;
    usuarioRenegociacao3: Usuario;
    
    usuario: Usuario;
    cliente: Pessoa;
    levantamento: Levantamento;

    valorParcelaFormatado: string;
    valorSolicitadoFormatado: string;
    valorFinalFormatado: string;
    saldoDevedorFormatado: string;
    taxaAnualFormatado: string;
    taxaMensalFormatado: string;
    taxaAnualRenegociacao1Formatado: string;
    taxaMensalRenegociacao1Formatado: string;
    taxaAnualRenegociacao2Formatado: string;
    taxaMensalRenegociacao2Formatado: string;
    taxaAnualRenegociacao3Formatado: string;
    taxaMensalRenegociacao3Formatado: string;

    idLinhaCredito: number;
    nomeBeneficiario: string;

    qtdParcelas: number;

    linhaCredito: LinhaCredito;
    pessoaNome: string;
    nomeFantasia: string;
    
}