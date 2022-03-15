import { Usuario } from '../models/usuario';
import { TipoGastoEnum } from '../enums/tipo.gasto';

export class LevantamentoCusto {

    id: number;
    dataCadastro: Date;
    dataAtualizacao: Date;
    usuario: Usuario;
    idLevantamento: number;

    mercadoria: string;
    unidade: string;
    preco: number;
    precoFormatado: string;
    qtd: number;
    custoTotal: number;

}