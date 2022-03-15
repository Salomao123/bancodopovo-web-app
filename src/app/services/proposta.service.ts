import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { Proposta } from '../models/proposta';
import { tap } from 'rxjs/operators';
import { PageSort } from '../vo/page.sort';
import { PropostaRenovacaoVo } from '../vo/proposta-renovacao.vo';
import { EmpregadoConsignante } from '../models/empregado-consignante';
import { Parcela } from '../models/parcela';

@Injectable({
    providedIn: 'root'
})
export class PropostaService {

    private salvarUrl: string;
    private alterarUrl: string;
    private encerrarUrl: string;
    private renovarUrl: string;
    private suspenderUrl: string;
    private cancelarSuspensaoUrl: string;
    private countUrl: string;
    private pesquisarUrl: string;
    private recuperarPorIdUrl: string;
    private recuperarConsignadoUrl: string;
    private recuperarPorEmpregadoUrl: string;
    private recuperarParcelasUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/proposta';
        this.alterarUrl = Utils.getUrlBackend() + '/api/proposta';
        this.encerrarUrl = Utils.getUrlBackend() + '/api/proposta-arquivo/encerrar/';
        this.renovarUrl = Utils.getUrlBackend() + '/api/proposta-arquivo/renovar';
        this.suspenderUrl = Utils.getUrlBackend() + '/api/proposta-arquivo/suspender';
        this.cancelarSuspensaoUrl = Utils.getUrlBackend() + '/api/proposta-arquivo/cancelar-suspensao';
        this.countUrl = Utils.getUrlBackend() + '/api/proposta/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/proposta/pesquisar';
        this.recuperarPorIdUrl = Utils.getUrlBackend() + '/api/proposta/';
        this.recuperarConsignadoUrl = Utils.getUrlBackend() + '/api/proposta/consignado';
        this.recuperarPorEmpregadoUrl = Utils.getUrlBackend() + '/api/proposta/por-empregado/';
        this.recuperarParcelasUrl = Utils.getUrlBackend() + '/api/proposta/parcelas/';
    }

    salvar(proposta: Proposta) {
        return this.http.post(this.salvarUrl, proposta).pipe(
            tap((res: Proposta) => res)
        );
    }

    alterar(proposta: Proposta) {
        return this.http.put(this.alterarUrl, proposta).pipe(
            tap((res: Proposta) => res)
        );
    }

    encerrar(id: number, file: File) {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post(this.encerrarUrl + id, formData, { headers: {'no-content-type': 'true'} });
    }

    renovar(propostaRenovacaoVo: PropostaRenovacaoVo, file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('propostaRenovacaoVo', new Blob([JSON.stringify(propostaRenovacaoVo)], { type: 'application/json' }));

        return this.http.post(this.renovarUrl, formData, { headers: {'no-content-type': 'true'} }).pipe(
            tap((res: Proposta) => this.tratarDatas(res))
        );
    }

    suspender(proposta: Proposta, file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('proposta', new Blob([JSON.stringify(proposta)], { type: 'application/json' }));

        return this.http.post(this.suspenderUrl, formData, { headers: {'no-content-type': 'true'} });
    }

    cancelarSuspensao(proposta: Proposta, file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('proposta', new Blob([JSON.stringify(proposta)], { type: 'application/json' }));

        return this.http.post(this.cancelarSuspensaoUrl, formData, { headers: {'no-content-type': 'true'} });
    }

    count(filtro: Proposta) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Proposta>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Proposta[]) => res.forEach(r => this.tratarDatas(r)))
        );
    }

    recuperarPorId(id: number) {
        return this.http.get(this.recuperarPorIdUrl + id).pipe(
            tap((res: Proposta) => this.tratarDatas(res))
        );
    }

    recuperarConsignado(filtro: Proposta) {
        return this.http.post(this.recuperarConsignadoUrl, filtro).pipe(
            tap((res: EmpregadoConsignante[]) => res)
        );
    }

    recuperarPorEmpregado(idEmpregado: number) {
        return this.http.get(this.recuperarPorEmpregadoUrl + idEmpregado).pipe(
            tap((res: Proposta[]) => res.forEach(p => this.tratarDatas(p)))
        );
    }

    recuperarParcelas(idProposta: number) {
        return this.http.get(this.recuperarParcelasUrl + idProposta).pipe(
            tap((res: Parcela[]) => res)
        );
    }

    tratarDatas(proposta: Proposta) {
        if (proposta.dataCadastro) {
            proposta.dataCadastro = new Date(proposta.dataCadastro);
        }
    }
}
