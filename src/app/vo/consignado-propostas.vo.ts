import { EmpregadoConsignante } from '../models/empregado-consignante';
import { Proposta } from '../models/proposta';

export class ConsignadoPropostasVo {
    consignado: EmpregadoConsignante;
    propostas: Proposta[];
}
