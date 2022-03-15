import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { tap } from 'rxjs/operators';
import { Uf } from '../models/uf';
import { Cidade } from '../models/cidade';
import { Endereco } from '../models/endereco';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class EnderecoService {

    recuperarUfsUrl: string;
    recuperarCidadesUrl: string;

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    atualizarStatusUrl: string;

    constructor(private http: HttpClient) {
        this.recuperarUfsUrl = Utils.getUrlBackend() + '/api/endereco/uf';
        this.recuperarCidadesUrl = Utils.getUrlBackend() + '/api/endereco/uf/';

        this.salvarUrl = Utils.getUrlBackend() + '/api/endereco';
        this.countUrl = Utils.getUrlBackend() + '/api/endereco/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/endereco/pesquisar';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/endereco/atualizarStatus';
    }

    recuperarUfs() {
        return this.http.get(this.recuperarUfsUrl).pipe(
            tap((res: Uf[]) => res)
        );
    }

    recuperarCidades(idUf: number) {
        return this.http.get(this.recuperarCidadesUrl + idUf + '/cidade').pipe(
            tap((res: Cidade[]) => res)
        );
    }

    salvar(endereco: Endereco) {
        return this.http.post(this.salvarUrl, endereco);
    }

    count(filtro: Endereco) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Endereco>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Endereco>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    atualizarStatus(endereco: Endereco) {
        return this.http.post(this.atualizarStatusUrl, endereco);
    }

    private tratarDatas(endereco: Endereco) {
        if (endereco.dataCadastro) {
            endereco.dataCadastro = new Date(endereco.dataCadastro);
        }

        if (endereco.dataAtualizacao) {
            endereco.dataAtualizacao = new Date(endereco.dataAtualizacao);
        }
    }
}
