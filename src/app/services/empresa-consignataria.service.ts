import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { EmpresaConsignataria } from '../models/empresa-consignataria';
import { tap } from 'rxjs/operators';
import { PageSort } from '../vo/page.sort';
import { StatusRegistroEnum } from '../enums/status.registro';

@Injectable({
    providedIn: 'root'
})
export class EmpresaConsignatariaService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    atualizarStatusUrl: string;
    recuperarPorStatusUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/empresa-consignataria';
        this.countUrl = Utils.getUrlBackend() + '/api/empresa-consignataria/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/empresa-consignataria/pesquisar';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/empresa-consignataria/atualizarStatus';
        this.recuperarPorStatusUrl = Utils.getUrlBackend() + '/api/empresa-consignataria/status/';
    }

    salvar(empresaConsignataria: EmpresaConsignataria) {
        return this.http.post(this.salvarUrl, empresaConsignataria).pipe(
            tap((res: EmpresaConsignataria) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    count(filtro: EmpresaConsignataria) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<EmpresaConsignataria>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<EmpresaConsignataria>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    atualizarStatus(empresaConsignataria: EmpresaConsignataria) {
        return this.http.post(this.atualizarStatusUrl, empresaConsignataria);
    }

    recuperarPorStatus(status: StatusRegistroEnum) {
        return this.http.get(this.recuperarPorStatusUrl + status).pipe(
            tap((res: EmpresaConsignataria[]) => res)
        );
    }

    private tratarDatas(empresaConsignataria: EmpresaConsignataria) {
        if (empresaConsignataria.dataCadastro) {
            empresaConsignataria.dataCadastro = new Date(empresaConsignataria.dataCadastro);
        }

        if (empresaConsignataria.dataAtualizacao) {
            empresaConsignataria.dataAtualizacao = new Date(empresaConsignataria.dataAtualizacao);
        }
    }
}
