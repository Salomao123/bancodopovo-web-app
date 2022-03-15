import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { ServicoConsignacao } from '../models/servico-consignacao';
import { tap } from 'rxjs/operators';
import { PageSort } from '../vo/page.sort';
import { StatusRegistroEnum } from '../enums/status.registro';
import { ServicoConsignacaoParcela } from '../models/servico-consignacao-parcela';

@Injectable({
    providedIn: 'root'
})
export class ServicoConsignacaoService {

    private salvarUrl: string;
    private countUrl: string;
    private pesquisarUrl: string;
    private atualizarStatusUrl: string;
    private recuperarPorStatusUrl: string;
    private recuperarParcelasPorServicoConsignacaoUrl: string;
    private atualizarParcelasUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/servico-consignacao';
        this.countUrl = Utils.getUrlBackend() + '/api/servico-consignacao/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/servico-consignacao/pesquisar';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/servico-consignacao/atualizarStatus';
        this.recuperarPorStatusUrl = Utils.getUrlBackend() + '/api/servico-consignacao/status/';
        this.recuperarParcelasPorServicoConsignacaoUrl = Utils.getUrlBackend() + '/api/servico-consignacao/parcelas/';
        this.atualizarParcelasUrl = Utils.getUrlBackend() + '/api/servico-consignacao/parcelas';
    }

    salvar(servicoConsignacao: ServicoConsignacao) {
        return this.http.post(this.salvarUrl, servicoConsignacao);
    }

    count(filtro: ServicoConsignacao) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<ServicoConsignacao>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<ServicoConsignacao>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    atualizarStatus(servicoConsignacao: ServicoConsignacao) {
        return this.http.post(this.atualizarStatusUrl, servicoConsignacao);
    }

    recuperarPorStatus(status: StatusRegistroEnum) {
        return this.http.get(this.recuperarPorStatusUrl + status).pipe(
            tap((res: ServicoConsignacao[]) => res.forEach(r => this.tratarDatas(r)))
        );
    }

    recuperarParcelasPorServicoConsignacao(id: number) {
        return this.http.get(this.recuperarParcelasPorServicoConsignacaoUrl + id).pipe(
            tap((res: ServicoConsignacaoParcela[]) => res)
        );
    }

    atualizarParcelas(parcelas: ServicoConsignacaoParcela[]) {
        return this.http.put(this.atualizarParcelasUrl, parcelas);
    }

    private tratarDatas(servicoConsignacao: ServicoConsignacao) {
        if (servicoConsignacao.dataCadastro) {
            servicoConsignacao.dataCadastro = new Date(servicoConsignacao.dataCadastro);
        }

        if (servicoConsignacao.dataAtualizacao) {
            servicoConsignacao.dataAtualizacao = new Date(servicoConsignacao.dataAtualizacao);
        }
    }
}
