import { StatusRegistroEnum } from './../enums/status.registro';
import { Pessoa } from './pessoa';
import { Banco } from './banco';
import {languageCalendar} from "../../app/util/languageCalendar"

export class EmpresaConsignataria {
    id: number;
    version: number;
    sigla: string;
    naturezaJuridica: string;
    status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    pessoa: Pessoa;
    banco: Banco;
    agencia: number;
    conta: number;
    pt: Object = languageCalendar
}
