import { Usuario } from '../models/usuario';

export class LevantamentoFornecedor {

    id: number;
    dataCadastro: Date;
    dataAtualizacao: Date;
    usuario: Usuario;
    idLevantamento: number;

    nome: string;
    tipoProduto: string;
    frequenciaCompras: string;

}