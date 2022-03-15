import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { LinhaCredito } from '../models/linha-credito';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TipoPessoaEnum } from '../enums/tipo.pessoa';
import { StatusRegistroEnum } from '../enums/status.registro';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class LinhasCreditoService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    recuperarPorIdUrl: string;
    atualizarStatusUrl: string;
    recuperarPorTipoStatusUrl: string;
    excluirUrl: string;
    verificaExistenciaEmprestimoUrl: string;
    pesquisarAtivasUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/linhaCredito';
        this.countUrl = Utils.getUrlBackend() + '/api/linhaCredito/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/linhaCredito/pesquisar';
        this.recuperarPorIdUrl = Utils.getUrlBackend() + '/api/linhaCredito/';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/linhaCredito/atualizarStatus';
        this.recuperarPorTipoStatusUrl = Utils.getUrlBackend() + '/api/linhaCredito';
        this.excluirUrl = Utils.getUrlBackend() + '/api/linhaCredito/excluir';
        this.verificaExistenciaEmprestimoUrl = Utils.getUrlBackend() + '/api/linhaCredito/verificaExistenciaEmprestimo';
        this.pesquisarAtivasUrl = Utils.getUrlBackend() + '/api/linhaCredito/ativas';
    }

    salvar(linhaCredito: LinhaCredito) {
        return this.http.post(this.salvarUrl, linhaCredito).pipe(
            tap((res: LinhaCredito) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    count(filtro: LinhaCredito) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<LinhaCredito>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<LinhaCredito>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }
                return res;
            })
        );
    }

    recuperarPorId(id: number) {
        return this.http.get(this.recuperarPorIdUrl + id).pipe(
            tap((res: LinhaCredito) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    private tratarDatas(linhaCredito: LinhaCredito) {
        if (linhaCredito.dataCadastro) {
            linhaCredito.dataCadastro = new Date(linhaCredito.dataCadastro);
        }

        if (linhaCredito.dataAtualizacao) {
            linhaCredito.dataAtualizacao = new Date(linhaCredito.dataAtualizacao);
        }
    }

    atualizarStatus(linhaCredito: LinhaCredito) {
        return this.http.post(this.atualizarStatusUrl, linhaCredito);
    }

    recuperarPorTipoStatus(tipo: TipoPessoaEnum, status: StatusRegistroEnum) {
        return this.http.get(this.recuperarPorTipoStatusUrl + '/tipo/' + tipo + '/status/' + status).pipe(
            tap((res: Array<LinhaCredito>) => res)
        );
    }

    verificaExistenciaEmprestimo(linhaCredito: LinhaCredito) {
        return this.http.post(this.verificaExistenciaEmprestimoUrl, linhaCredito).pipe(
            tap((res: LinhaCredito) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    excluir(linhaCredito: LinhaCredito) {
        return this.http.post(this.excluirUrl, linhaCredito);
    }

    recuperarLinhasAtivas(tipoPessoa: number) {

        let linhaCredito = new LinhaCredito();
        linhaCredito.tipoPessoa = tipoPessoa;
        console.log(linhaCredito);
        return this.http.post(this.pesquisarAtivasUrl, linhaCredito).pipe(
            tap((res: Array<LinhaCredito>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }
                return res;
            })
        );
    }
}
