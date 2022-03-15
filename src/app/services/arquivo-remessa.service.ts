import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ArquivoRemessa } from '../models/arquivo-remessa';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class ArquivoRemessaService {

    private countUrl: string;
    private pesquisarUrl: string;
    private retornoUrl: string;
    private gerarRemessaUrl: string;

    constructor(private http: HttpClient) {
        this.countUrl = Utils.getUrlBackend() + '/api/remessa/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/remessa/pesquisar';
        this.retornoUrl = Utils.getUrlBackend() + '/api/remessa/retorno';
        this.gerarRemessaUrl = Utils.getUrlBackend() + '/api/remessa';
    }

    count(filtro: ArquivoRemessa) {
        return this.http.post(this.countUrl, filtro);
    }

    pesquisar(pageSort: PageSort<ArquivoRemessa>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<ArquivoRemessa>) => res)
        );
    }

    enviarRetorno(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post(this.retornoUrl, formData, { headers: {'no-content-type': 'true'} }).pipe(
            tap((res: ArquivoRemessa) => res)
        );
    }

    gerarRemessa() {
        return this.http.get(this.gerarRemessaUrl, { observe: 'response', responseType: 'arraybuffer' }).pipe(
            map((res: any) => {
                const data = {
                    file: res.body,
                    name: 'CNAB_' + new Date().getTime()
                };

                return data;
            })
        );
    }
}
