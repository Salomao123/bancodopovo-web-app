import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { Emprestimo } from '../models/emprestimo';
import { Parcela } from '../models/parcela';
import { Boleto } from '../models/boleto';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TipoPessoaEnum } from '../enums/tipo.pessoa';
import { StatusRegistroEnum } from '../enums/status.registro';
import { PageSort } from '../vo/page.sort';
import { FormatadoresUtil } from '../util/formatadores';

@Injectable({
    providedIn: 'root'
})
export class EmprestimosService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    recuperarPorIdUrl: string;
    atualizarStatusUrl: string;
    recuperarPorTipoStatusUrl: string;
    recuperarParcelasUrl: string;
    recuperarBoletoUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/emprestimo';
        this.countUrl = Utils.getUrlBackend() + '/api/emprestimo/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/emprestimo/pesquisar';
        this.recuperarPorIdUrl = Utils.getUrlBackend() + '/api/emprestimo/';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/emprestimo/atualizarStatus';
        this.recuperarPorTipoStatusUrl = Utils.getUrlBackend() + '/api/emprestimo';
        this.recuperarParcelasUrl = Utils.getUrlBackend() + '/api/emprestimo/recuperarParcelas';
        this.recuperarBoletoUrl = Utils.getUrlBackend() + '/api/emprestimo/recuperarBoleto';
    }

    salvar(emprestimo: Emprestimo) {
        return this.http.post(this.salvarUrl, emprestimo).pipe(
            tap((res: Emprestimo) => {
                this.tratarDadosEmprestimo(res);
                return res;
            })
        );
    }

    count(filtro: Emprestimo) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Emprestimo>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Emprestimo>) => {
                for (const i of res) {
                    this.tratarDadosEmprestimo(i);
                }

                return res;
            })
        );
    }

    recuperarPorId(id: number) {
        return this.http.get(this.recuperarPorIdUrl + id).pipe(
            tap((res: Emprestimo) => {
                this.tratarDadosEmprestimo(res);
                return res;
            })
        );
    }

    private tratarDadosEmprestimo(emprestimo: Emprestimo) {
        if (emprestimo.dataCadastro) {
            emprestimo.dataCadastro = new Date(emprestimo.dataCadastro);
        }

        if (emprestimo.dataAtualizacao) {
            emprestimo.dataAtualizacao = new Date(emprestimo.dataAtualizacao);
        }

        if (emprestimo.valorFinal) {
            emprestimo.valorFinalFormatado = this.converterMoeda(emprestimo.valorFinal);
        }

        if (emprestimo.saldoDevedor) {
            emprestimo.saldoDevedorFormatado = this.converterMoeda(emprestimo.saldoDevedor);
        }

        if (emprestimo.taxaAnual) {
            emprestimo.taxaAnualFormatado = this.converterMoeda(emprestimo.taxaAnual);
        }

        if (emprestimo.taxaMensal) {
            emprestimo.taxaMensalFormatado = this.converterMoeda(emprestimo.taxaMensal);
        }
    }

    atualizarStatus(emprestimo: Emprestimo) {
        return this.http.post(this.atualizarStatusUrl, emprestimo);
    }

    recuperarPorTipoStatus(tipo: TipoPessoaEnum, status: StatusRegistroEnum) {
        return this.http.get(this.recuperarPorTipoStatusUrl + '/tipo/' + tipo + '/status/' + status).pipe(
            tap((res: Array<Emprestimo>) => res)
        );
    }

    recuperarParcelas(id: number) {
        return this.http.post(this.recuperarParcelasUrl, id).pipe(
            tap((res: Array<Parcela>) => {
                for (const i of res) {
                    this.tratarDadosParcela(i);
                }
                return res;
            })
        );
    }

    private tratarDadosParcela(parcela: Parcela) {

        if (parcela.dataVencimento) {
            parcela.dataVencimento = new Date(parcela.dataVencimento);
        }

        if (parcela.valor) {
            parcela.valorFormatado = this.converterMoeda(parcela.valor);
        }
    }

    converterMoeda(moeda: number) {
        var moedaFormatada = '';
        if (moeda != null) {
            moedaFormatada = FormatadoresUtil.formatarMoeda(moeda);
        }
        return moedaFormatada;
    }

    recuperarBoleto(id: number) {
        return this.http.post(this.recuperarBoletoUrl, id).pipe(
            tap((res: Boleto) => {
                this.tratarDadosBoleto(res);
                return res;
            })
        );
    }

    private tratarDadosBoleto(boleto: Boleto) {

        dataVencimento: Date;
        dataEmissao: Date;
        dataJuros: Date;
        dataMulta: Date;
        dataDescontoUm: Date;
        dataDescontoDois: Date;
        dataDescontoTres: Date;

        if (boleto.dataVencimento) {
            boleto.dataVencimento = new Date(boleto.dataVencimento);
        }
        if (boleto.dataEmissao) {
            boleto.dataEmissao = new Date(boleto.dataEmissao);
        }
        if (boleto.dataJuros) {
            boleto.dataJuros = new Date(boleto.dataJuros);
        }
        if (boleto.dataMulta) {
            boleto.dataMulta = new Date(boleto.dataMulta);
        }
        if (boleto.dataDescontoUm) {
            boleto.dataDescontoUm = new Date(boleto.dataDescontoUm);
        }
        if (boleto.dataDescontoDois) {
            boleto.dataDescontoDois = new Date(boleto.dataDescontoDois);
        }
        if (boleto.dataDescontoTres) {
            boleto.dataDescontoTres = new Date(boleto.dataDescontoTres);
        }

        if (boleto.valor) {
            boleto.valorFormatado = this.converterMoeda(boleto.valor);
        }
        if (boleto.valorJuros) {
            boleto.valorJurosFormatado = this.converterMoeda(boleto.valorJuros);
        }
        if (boleto.valorMulta) {
            boleto.valorMultaFormatado = this.converterMoeda(boleto.valorMulta);
        }
        if (boleto.valorDescontoUm) {
            boleto.valorDescontoUmFormatado = this.converterMoeda(boleto.valorDescontoUm);
        }
        if (boleto.valorDescontoDois) {
            boleto.valorDescontoDoisFormatado = this.converterMoeda(boleto.valorDescontoDois);
        }
        if (boleto.valorDescontoTres) {
            boleto.valorDescontoTresFormatado = this.converterMoeda(boleto.valorDescontoTres);
        }
        if (boleto.valorIof) {
            boleto.valorIofFormatado = this.converterMoeda(boleto.valorIof);
        }
        if (boleto.valorAbatimento) {
            boleto.valorAbatimentoFormatado = this.converterMoeda(boleto.valorAbatimento);
        }

    }

}
