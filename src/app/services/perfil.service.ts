import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { Perfil } from '../models/perfil';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { PageSort } from '../vo/page.sort';
import { Acao } from '../models/acao';

@Injectable({
    providedIn: 'root'
})
export class PerfilService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    recuperarPorIdUrl: string;
    atualizarStatusUrl: string;
    recuperarPorTipoStatusUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/perfil';
        this.countUrl = Utils.getUrlBackend() + '/api/perfil/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/perfil/pesquisar';
        this.recuperarPorIdUrl = Utils.getUrlBackend() + '/api/perfil/';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/perfil/atualizarStatus';
        this.recuperarPorTipoStatusUrl = Utils.getUrlBackend() + '/api/perfil';
    }

    salvar(perfil: Perfil) {
        return this.http.post(this.salvarUrl, perfil).pipe(
            tap((res: Perfil) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    count(filtro: Perfil) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Perfil>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Perfil>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    recuperarPorId(id: number) {
        return this.http.get(this.recuperarPorIdUrl + id).pipe(
            tap((res: Perfil) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    private tratarDatas(perfil: Perfil) {
        if (perfil.dataCadastro) {
            perfil.dataCadastro = new Date(perfil.dataCadastro);
        }

        if (perfil.dataAtualizacao) {
            perfil.dataAtualizacao = new Date(perfil.dataAtualizacao);
        }
    }

    atualizarStatus(perfil: Perfil) {
        return this.http.post(this.atualizarStatusUrl, perfil);
    }

}
