import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { EmpregadoConsignante } from '../models/empregado-consignante';
import { tap } from 'rxjs/operators';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class EmpregadoConsignanteService {

    private salvarUrl: string;
    private countUrl: string;
    private pesquisarUrl: string;
    private recuperarPorIdUrl: string;
    private atualizarStatusUrl: string;
    private recuperarPorEmpresaUrl: string;
    private recuperarPorUsuarioUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/empregado-consignante';
        this.countUrl = Utils.getUrlBackend() + '/api/empregado-consignante/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/empregado-consignante/pesquisar';
        this.recuperarPorIdUrl = Utils.getUrlBackend() + '/api/empregado-consignante/';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/empregado-consignante/atualizarStatus';
        this.recuperarPorEmpresaUrl = Utils.getUrlBackend() + '/api/empregado-consignante/empresa/';
        this.recuperarPorUsuarioUrl = Utils.getUrlBackend() + '/api/empregado-consignante/por-usuario';
    }

    salvar(empregadoConsignante: EmpregadoConsignante) {
        return this.http.post(this.salvarUrl, empregadoConsignante).pipe(
            tap((res: EmpregadoConsignante) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    count(filtro: EmpregadoConsignante) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<EmpregadoConsignante>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<EmpregadoConsignante>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }
                return res;
            })
        );
    }

    recuperarPorId(id: number) {
        return this.http.get(this.recuperarPorIdUrl + id).pipe(
            tap((res: EmpregadoConsignante) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    private tratarDatas(empregadoConsignante: EmpregadoConsignante) {
        if (empregadoConsignante.dataCadastro) {
            empregadoConsignante.dataCadastro = new Date(empregadoConsignante.dataCadastro);
        }

        if (empregadoConsignante.dataAtualizacao) {
            empregadoConsignante.dataAtualizacao = new Date(empregadoConsignante.dataAtualizacao);
        }
    }

    atualizarStatus(empregadoConsignante: EmpregadoConsignante) {
        return this.http.post(this.atualizarStatusUrl, empregadoConsignante);
    }

    recuperarPorEmpresa(idEmpresa: number) {
        return this.http.get(this.recuperarPorEmpresaUrl + idEmpresa).pipe(
            tap((res: EmpregadoConsignante[]) => res)
        );
    }

    recuperarPorUsario() {
        return this.http.get(this.recuperarPorUsuarioUrl).pipe(
            tap((res: EmpregadoConsignante[]) => res.forEach(ec => this.tratarDatas(ec)))
        );
    }
}
