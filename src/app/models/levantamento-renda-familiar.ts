import { Usuario } from '../models/usuario';
import { FormatadoresUtil } from '../util/formatadores';

export class LevantamentoRendaFamiliar {

    id: number;
    dataCadastro: Date;
    dataAtualizacao: Date;
    usuario: Usuario;
    idLevantamento: number;

    nome: string;
    fonteRenda: string;
    rendaMensal: number;
    rendaMensalFormatada: string;

}