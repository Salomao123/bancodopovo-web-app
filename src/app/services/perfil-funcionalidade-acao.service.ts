import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { Acao } from '../models/acao';
import { tap } from 'rxjs/operators';
import { PerfilFuncionalidadeAcao } from '../models/perfil-funcionalidade-acao';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class PerfilFuncionalidadeAcaoService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    atualizarStatusUrl: string;
    recuperarAcoesNaoVinculadasUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/perfilFuncionalidadeAcao';
        this.countUrl = Utils.getUrlBackend() + '/api/perfilFuncionalidadeAcao/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/perfilFuncionalidadeAcao/pesquisar';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/perfilFuncionalidadeAcao/atualizarStatus';
        this.recuperarAcoesNaoVinculadasUrl = Utils.getUrlBackend() + '/api/perfilFuncionalidadeAcao/';
    }

    salvar(lista: PerfilFuncionalidadeAcao[]) {
        return this.http.post(this.salvarUrl, lista).pipe(
            tap((res: Array<PerfilFuncionalidadeAcao>) => {
                res.forEach(p => this.tratarDatas(p));
                return res;
            })
        );
    }

    count(filtro: PerfilFuncionalidadeAcao) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<PerfilFuncionalidadeAcao>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<PerfilFuncionalidadeAcao>) => {
                res.forEach(p => this.tratarDatas(p));
                return res;
            })
        );
    }

    recperarAcoesNaoVinculadas(idPerfil: number, idFuncionaliadade: number) {
        return this.http.get(this.recuperarAcoesNaoVinculadasUrl + idPerfil + '/funcionalidade/' + idFuncionaliadade
            + '/acoes-nao-vinculadas').pipe(
                tap((res: Array<Acao>) => res)
            );
    }

    private tratarDatas(perfil: PerfilFuncionalidadeAcao) {
        if (perfil.dataCadastro) {
            perfil.dataCadastro = new Date(perfil.dataCadastro);
        }
    }

    atualizarStatus(perfil: PerfilFuncionalidadeAcao) {
        return this.http.post(this.atualizarStatusUrl, perfil);
    }
}
