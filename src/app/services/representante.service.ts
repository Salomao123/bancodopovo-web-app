import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { Representante } from '../models/representante';
import { tap } from 'rxjs/operators';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class RepresentanteService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    atualizarStatusUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/representante';
        this.countUrl = Utils.getUrlBackend() + '/api/representante/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/representante/pesquisar';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/representante/atualizarStatus';
    }

    salvar(representante: Representante) {
        return this.http.post(this.salvarUrl, representante);
    }

    count(filtro: Representante) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Representante>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Representante>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    atualizarStatus(representante: Representante) {
        return this.http.post(this.atualizarStatusUrl, representante);
    }

    private tratarDatas(representante: Representante) {
        if (representante.dataCadastro) {
            representante.dataCadastro = new Date(representante.dataCadastro);
        }

        if (representante.dataAtualizacao) {
            representante.dataAtualizacao = new Date(representante.dataAtualizacao);
        }
    }
}
