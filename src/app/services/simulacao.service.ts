import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { SimulacaoVo } from '../vo/simulacao.vo';
import { tap } from 'rxjs/operators';
import { SimulacaoEmprestimoVo } from '../vo/simulacao.emprestimo.vo';

@Injectable({
    providedIn: 'root'
})
export class SimulacaoService {

    private simularUrl: string;
    private realizarSimulacaoUrl: string;

    constructor(private http: HttpClient) {
        this.simularUrl = Utils.getUrlBackend() + '/api/simulacao/';
        this.realizarSimulacaoUrl = Utils.getUrlBackend() + '/api/simulacao/realizar/';
    }

    simular(empregadoConsignante: number, simulacaoVo: SimulacaoEmprestimoVo) {
        return this.http.post(this.simularUrl + empregadoConsignante, simulacaoVo).pipe(
            tap((res: SimulacaoVo[]) => res)
        );
    }

    realizarSimulacao(idServicoConsignacao: number, simulacaoVo: SimulacaoEmprestimoVo) {
        return this.http.post(this.realizarSimulacaoUrl + idServicoConsignacao, simulacaoVo).pipe(
            tap((res: SimulacaoEmprestimoVo[]) => res)
        );
    }
}
