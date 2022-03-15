import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { VisualizacaoMargem } from '../models/visualizacao-margem';
import { tap } from 'rxjs/operators';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class MargemService {

    private solicitarUrl: string;
    private consultarMargemUrl: string;
    private countUrl: string;
    private pesquisarUrl: string;
    private atualizarSituacaoUrl: string;

    constructor(private http: HttpClient) {
        this.solicitarUrl = Utils.getUrlBackend() + '/api/margem/solicitar';
        this.consultarMargemUrl = Utils.getUrlBackend() + '/api/margem/cpf/';
        this.countUrl = Utils.getUrlBackend() + '/api/margem/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/margem/pesquisar';
        this.atualizarSituacaoUrl = Utils.getUrlBackend() + '/api/margem/atualizar-situacao';
    }

    solicitar(margem: VisualizacaoMargem) {
        return this.http.post(this.solicitarUrl, margem).pipe(
            tap((res: VisualizacaoMargem) => this.tratarDatas(res))
        );
    }

    consultarMargem(cpf: string) {
        return this.http.get(this.consultarMargemUrl + cpf).pipe(
            tap((res: VisualizacaoMargem) => this.tratarDatas(res))
        );
    }

    count(filtro: VisualizacaoMargem) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<VisualizacaoMargem>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: VisualizacaoMargem[]) => res.forEach(r => this.tratarDatas(r)))
        );
    }

    tratarDatas(margem: VisualizacaoMargem) {
        if (margem) {
            if (margem.dataSolicitacao) {
                margem.dataSolicitacao = new Date(margem.dataSolicitacao);
            }

            if (margem.dataResposta) {
                margem.dataResposta = new Date(margem.dataResposta);
            }
        }
    }

    atualizarSituacao(margem: VisualizacaoMargem) {
        return this.http.post(this.atualizarSituacaoUrl, margem);
    }
}
