import { Pessoa } from './pessoa';
import { Evento } from './evento';

export class Participante {
    id: number;
    idEvento: number;
    idPessoa: number;
    pessoa: Pessoa;
    evento: Evento;
}
