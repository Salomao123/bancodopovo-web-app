import { SituacaoVisualizacaoMargemEnum } from '../enums/situacao.visualizacao.margem';
import { Usuario } from './usuario';
import { EmpresaConsignataria } from './empresa-consignataria';
import { EmpregadoConsignante } from './empregado-consignante';
import { Pessoa } from './pessoa';

export class VisualizacaoMargem {
    id: number;
    version: number;
    situacao: SituacaoVisualizacaoMargemEnum;
    dataSolicitacao: Date;
    dataResposta: Date;
    usuarioSolicitante: Usuario;
    empresaConsignataria: EmpresaConsignataria;
    pessoa: Pessoa;
    empregados: EmpregadoConsignante[];
}
