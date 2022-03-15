import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { Convenio } from '../models/convenio';
import { PageSort } from '../vo/page.sort';
import { tap } from 'rxjs/operators';
import { Pessoa } from '../models/pessoa';
import { ConvenioVo } from '../vo/convenio.vo';

@Injectable({
    providedIn: 'root'
})
export class ConvenioService {

    private salvarUrl: string;
    private countUrl: string;
    private pesquisarUrl: string;
    private atualizarStatusUrl: string;
    private consultarPorEmpresaCnpjUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/convenio';
        this.countUrl = Utils.getUrlBackend() + '/api/convenio/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/convenio/pesquisar';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/convenio/atualizarStatus';
        this.consultarPorEmpresaCnpjUrl = Utils.getUrlBackend() + '/api/convenio/empresa/cnpj';
    }

    salvar(convenio: Convenio) {
        return this.http.post(this.salvarUrl, convenio);
    }

    count(filtro: Convenio) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Convenio>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Convenio>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    atualizarStatus(convenio: Convenio) {
        return this.http.post(this.atualizarStatusUrl, convenio);
    }

    consultarPorEmpresa(pessoa: Pessoa) {
        return this.http.post(this.consultarPorEmpresaCnpjUrl, pessoa).pipe(
            tap((res: ConvenioVo) => this.tratarDatas(res.convenio))
        );
    }

    private tratarDatas(convenio: Convenio) {
        if (convenio.dataCadastro) {
            convenio.dataCadastro = new Date(convenio.dataCadastro);
        }

        if (convenio.dataVigenciaInicio) {
            convenio.dataVigenciaInicio = new Date(convenio.dataVigenciaInicio);
        }

        if (convenio.dataVigenciaFinal) {
            convenio.dataVigenciaFinal = new Date(convenio.dataVigenciaFinal);
        }
    }
}
