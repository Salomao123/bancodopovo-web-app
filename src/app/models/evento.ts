import { StatusEventoEnum } from '../enums/status.evento';
import { Usuario } from './usuario';

export class Evento {

    id: number;
	status: StatusEventoEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    dataEvento: Date;
    usuario: Usuario;
    descricao: string;
    nome: string;
    qtdParticipantes: number;
    nomeLocal: string;
    enderecoLocal: string;
    
}