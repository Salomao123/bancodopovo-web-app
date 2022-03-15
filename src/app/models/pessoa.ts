import { StatusRegistroEnum } from '../enums/status.registro';
import { EstadoCivilEnum } from '../enums/estado.civil';
import { TipoPessoaEnum } from '../enums/tipo.pessoa';

export class Pessoa {

    id: number;
    version: number;
    status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    nome: string;
    tipo: TipoPessoaEnum;
    documento: string;
    dataNascimento: Date;
    razaoSocial: string;
    nomeFantasia: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;

    estadoCivil: number;
    indDocumentacaoCompletaPf: number;
    indDocumentacaoCompletaPj: number;
    indDocumentacaoCompletaAv: number;

    img3x4: string;
    imgCpf: string;
    imgTituloEleitorFrente: string;
    imgTituloEleitorVerso: string;
    imgDocumentoFotoFrente: string;
    imgDocumentoFotoVerso: string;
    imgComprovanteResidenciaFrente: string;
    imgComprovanteResidenciaVerso: string;
    imgExtratoBancario: string;
    imgCertidaoCasamentoFrente: string;
    imgCertidaoCasamentoVerso: string;
    imgCartaoBanco: string;

    imgCartaoCNPJ: string;
    imgAlvaraFuncionamento: string;
    imgLicencaMeioAmbiente: string;
    imgLicencaVigilanciaSanitaria: string;

    imgExtratoBancarioPj: string;
    imgCartaoBancoPj: string;

    imgComprovanteRenda: string;
    imgComprovanteRenda2: string;
    
    certidaoCasamento: string;
    comprovanteResidencia: string;
    mesAnoComprovanteResidencia: string;
    comprovanteRenda: string;
    mesAnoComprovanteRenda: string;
    contratoSocialCertMei: string;
    cartaoCnpj: string;
    balancoPatrimonialIr: string;
    alvaraFuncionamento: string;
    faturamentoUltimos6Meses: string;
    mesAnoFaturamento: string;
    cartaoExtratoContaPj: string;
    cartaoBancoPf: string;
    extratoContaPf: string;
    licencaMeioAmbiente: string;
    licencaVigilanciaSanitaria: string;

    profissao: string;
    atividadeEconomica: string;

    dataRecebimentoDocumentos: Date;
    dataUltimaConsultaSerasa: Date;
    indicadorNomeSujo: number; 
    scoreNome: number;

    indicadorPossuiEndereco: number;

}
