import { StatusRegistroEnum } from '../enums/status.registro';
import { SituacaoConvenioEnum } from '../enums/situacao.convenio';
import { Empresa } from './empresa';
import { EmpresaConsignataria } from './empresa-consignataria';

export class Convenio {
    id: number;
    version: number;
    identificacaoConvenio: string;
    dataCadastro: Date;
    dataVigenciaInicio: Date;
    dataVigenciaFinal: Date;
    status: StatusRegistroEnum;
    situacao: SituacaoConvenioEnum;
    empresa: Empresa;
    empresaConsignataria: EmpresaConsignataria;
}
