import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { Empresa } from '../models/empresa';
import { tap } from 'rxjs/operators';
import { PageSort } from '../vo/page.sort';
import { StatusRegistroEnum } from '../enums/status.registro';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    recuperarPorIdUrl: string;
    atualizarStatusUrl: string;
    recuperarPorStatusUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/empresa';
        this.countUrl = Utils.getUrlBackend() + '/api/empresa/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/empresa/pesquisar';
        this.recuperarPorIdUrl = Utils.getUrlBackend() + '/api/empresa/';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/empresa/atualizarStatus';
        this.recuperarPorStatusUrl = Utils.getUrlBackend() + '/api/empresa/status/';
    }

    salvar(empresa: Empresa) {
        return this.http.post(this.salvarUrl, empresa).pipe(
            tap((res: Empresa) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    count(filtro: Empresa) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Empresa>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Empresa>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }
                return res;
            })
        );
    }

    recuperarPorId(id: number) {
        return this.http.get(this.recuperarPorIdUrl + id).pipe(
            tap((res: Empresa) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    private tratarDatas(empresa: Empresa) {
        if (empresa.dataCadastro) {
            empresa.dataCadastro = new Date(empresa.dataCadastro);
        }

        if (empresa.dataAtualizacao) {
            empresa.dataAtualizacao = new Date(empresa.dataAtualizacao);
        }
    }

    atualizarStatus(empresa: Empresa) {
        return this.http.post(this.atualizarStatusUrl, empresa);
    }

    recuperarPorStatus(status: StatusRegistroEnum) {
        return this.http.get(this.recuperarPorStatusUrl + status).pipe(
            tap((res: Empresa[]) => res)
        );
    }
}
