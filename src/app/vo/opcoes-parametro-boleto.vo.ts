import { OpcaoParametroVo } from './opcao-parametro.vo';

export class OpcoesParametroBoletoVo {
    tiposDocumentos: Array<OpcaoParametroVo<number>>;
    codigosCarteira: Array<OpcaoParametroVo<number>>;
    formasCadastro: Array<OpcaoParametroVo<number>>;
    tiposDocCobranca: Array<OpcaoParametroVo<number>>;
    emissoesBloqueto: Array<OpcaoParametroVo<number>>;
    identificacoesDistribuicao: Array<OpcaoParametroVo<number>>;
    especiesTitulo: Array<OpcaoParametroVo<number>>;
    codsJuros: Array<OpcaoParametroVo<number>>;
    codsMulta: Array<OpcaoParametroVo<number>>;
    codsDesconto: Array<OpcaoParametroVo<number>>;
    codsProtesto: Array<OpcaoParametroVo<number>>;
    codsBaixa: Array<OpcaoParametroVo<number>>;
    identificacoesTituloAceito: Array<OpcaoParametroVo<number>>;
}
