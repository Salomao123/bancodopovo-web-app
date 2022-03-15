import { StatusRegistroEnum } from '../enums/status.registro';
import { Pessoa } from '../models/pessoa';

export class Visita {

    id: number;
	status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    nome: String;

    dataVisita: Date;
    descricao: String;
    idPessoa: number;
    pessoa: Pessoa;

}