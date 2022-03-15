import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { Levantamento } from '../models/levantamento';
import { SimulacaoEmprestimoVo } from '../vo/simulacao.emprestimo.vo';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TipoPessoaEnum } from '../enums/tipo.pessoa';
import { StatusRegistroEnum } from '../enums/status.registro';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class LevantamentosService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    recuperarPorIdUrl: string;
    atualizarStatusUrl: string;
    recuperarPorTipoStatusUrl: string;
    finalizarUrl: string;
    recuperarRascunhoPessoaUrl: string;
    copiarLevantamentoUrl: string;
    recuperarParcelaUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/levantamento';
        this.countUrl = Utils.getUrlBackend() + '/api/levantamento/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/levantamento/pesquisar';
        this.recuperarPorIdUrl = Utils.getUrlBackend() + '/api/levantamento/';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/levantamento/atualizarStatus';
        this.recuperarPorTipoStatusUrl = Utils.getUrlBackend() + '/api/levantamento';
        this.finalizarUrl = Utils.getUrlBackend() + '/api/levantamento/finalizar';
        this.recuperarRascunhoPessoaUrl = Utils.getUrlBackend() + '/api/levantamento/rascunhoPessoa';
        this.copiarLevantamentoUrl = Utils.getUrlBackend() + '/api/levantamento/copiar/';
        this.recuperarParcelaUrl = Utils.getUrlBackend() + '/api/levantamento/recuperarParcela';
    }

    salvar(levantamento: Levantamento) {
        return this.http.post(this.salvarUrl, levantamento).pipe(
            tap((res: Levantamento) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    finalizar(levantamento: Levantamento) {
        return this.http.post(this.finalizarUrl, levantamento).pipe(
            tap((res: Levantamento) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    count(filtro: Levantamento) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Levantamento>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Levantamento>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    recuperarPorId(id: number) {
        return this.http.get(this.recuperarPorIdUrl + id).pipe(
            tap((res: Levantamento) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    copiar(id: number) {
        return this.http.get(this.copiarLevantamentoUrl + id).pipe(
            tap((res: Levantamento) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    recuperarRascunhoPessoa(idPessoa: number) {
        return this.http.get(this.recuperarRascunhoPessoaUrl + '/' + idPessoa).pipe(
            tap((res: Levantamento) => {
                if (res && res.id != null) {
                    this.tratarDatas(res);
                }
                return res;
            })
        );
    }

    private tratarDatas(levantamento: Levantamento) {
        if (levantamento.dataCadastro) {
            levantamento.dataCadastro = new Date(levantamento.dataCadastro);
        }

        if (levantamento.dataAtualizacao) {
            levantamento.dataAtualizacao = new Date(levantamento.dataAtualizacao);
        }

        if (levantamento.dataLevantamento) {
            levantamento.dataLevantamento = new Date(levantamento.dataLevantamento);
        }
        
        if (levantamento.dataTermino) {
            levantamento.dataTermino = new Date(levantamento.dataTermino);
        }

        if (levantamento.dataComunicado) {
            levantamento.dataComunicado = new Date(levantamento.dataComunicado);
        }
    }

    atualizarStatus(levantamento: Levantamento) {
        return this.http.post(this.atualizarStatusUrl, levantamento);
    }

    recuperarPorTipoStatus(tipo: TipoPessoaEnum, status: StatusRegistroEnum) {
        return this.http.get(this.recuperarPorTipoStatusUrl + '/tipo/' + tipo + '/status/' + status).pipe(
            tap((res: Array<Levantamento>) => res)
        );
    }

    recuperarParcela(simulacao: SimulacaoEmprestimoVo) {
        return this.http.post(this.recuperarParcelaUrl, simulacao).pipe(
            tap((res: SimulacaoEmprestimoVo) => {
                return res;
            })
        )
    }
}
