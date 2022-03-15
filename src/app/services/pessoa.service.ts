import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { Pessoa } from '../models/pessoa';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { TipoPessoaEnum } from '../enums/tipo.pessoa';
import { StatusRegistroEnum } from '../enums/status.registro';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class PessoaService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    recuperarPorIdUrl: string;
    atualizarStatusUrl: string;
    recuperarPorTipoStatusUrl: string;
    recuperarPorCPFUrl: string;
    enviarImagemUrl: string;
    removerImagemUrl: string;
    salvarDadosFinanceiroUrl: string;
    uploadPdfUrl: string;
    downloadPdfUrl: string;
    recuperarPessoasUrl: string;
    recuperarPorDocumentoUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/pessoa';
        this.salvarDadosFinanceiroUrl = Utils.getUrlBackend() + '/api/pessoa/salvarDadosFinanceiros';
        this.countUrl = Utils.getUrlBackend() + '/api/pessoa/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/pessoa/pesquisar';
        this.recuperarPorIdUrl = Utils.getUrlBackend() + '/api/pessoa/';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/pessoa/atualizarStatus';
        this.recuperarPorTipoStatusUrl = Utils.getUrlBackend() + '/api/pessoa';
        this.recuperarPorCPFUrl = Utils.getUrlBackend() + '/api/pessoa/cpf';
        this.enviarImagemUrl = Utils.getUrlBackend() + '/api/pessoa/imagem';
        this.removerImagemUrl = Utils.getUrlBackend() + '/api/pessoa/removerImagem';
        this.uploadPdfUrl = Utils.getUrlBackend() + '/api/pessoaUpload/uploadPdf';
        this.downloadPdfUrl = Utils.getUrlBackend() + '/api/pessoaDownload/download/';
        this.recuperarPessoasUrl = Utils.getUrlBackend() + '/api/pessoa/todos';
        this.recuperarPorDocumentoUrl = Utils.getUrlBackend() + '/api/pessoa/documento'; 
    }

    salvar(pessoa: Pessoa) {
        return this.http.post(this.salvarUrl, pessoa).pipe(
            tap((res: Pessoa) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    salvarDadosFinanceiros(pessoa: Pessoa) {
        return this.http.post(this.salvarDadosFinanceiroUrl, pessoa).pipe(
            tap((res: Pessoa) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    count(filtro: Pessoa) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Pessoa>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Pessoa>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    recuperarPessoas() {
        return this.http.get(this.recuperarPessoasUrl).pipe(
            tap((res: Array<Pessoa>) => {
                //this.tratarDatas(res);
                //return res;
                var pessoas = [];
                for (var i=0; i< res.length; i++) {
                    pessoas.push(res[i]);
                }
                return pessoas;
            })
        );
    }

    recuperarPorId(id: number) {
        return this.http.get(this.recuperarPorIdUrl + id).pipe(
            tap((res: Pessoa) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    private tratarDatas(pessoa: Pessoa) {
        if (pessoa.dataCadastro) {
            pessoa.dataCadastro = new Date(pessoa.dataCadastro);
        }

        if (pessoa.dataAtualizacao) {
            pessoa.dataAtualizacao = new Date(pessoa.dataAtualizacao);
        }

        if (pessoa.dataNascimento) {
            pessoa.dataNascimento = new Date(pessoa.dataNascimento);
        }

        if (pessoa.dataRecebimentoDocumentos) {
            pessoa.dataRecebimentoDocumentos = new Date(pessoa.dataRecebimentoDocumentos);
        }

        if (pessoa.dataUltimaConsultaSerasa) {
            pessoa.dataUltimaConsultaSerasa = new Date(pessoa.dataUltimaConsultaSerasa);
        }
    }

    atualizarStatus(pessoa: Pessoa) {
        return this.http.post(this.atualizarStatusUrl, pessoa);
    }

    recuperarPorTipoStatus(tipo: TipoPessoaEnum, status: StatusRegistroEnum) {
        return this.http.get(this.recuperarPorTipoStatusUrl + '/tipo/' + tipo + '/status/' + status).pipe(
            tap((res: Array<Pessoa>) => res)
        );
    }

    recuperarPorCPF(documento: String) {
        let pessoa = new Pessoa();
        pessoa.documento = documento.toString();
        return this.http.post(this.recuperarPorDocumentoUrl, pessoa).pipe(
        //return this.http.get(this.recuperarPorCPFUrl + '/' + '\'' + cpf.replace('/', '%2F') + '\'').pipe(
            tap((res: Pessoa) => {
                console.log(res);
                if (res) {
                    this.tratarDatas(res);
                }
                return res;
            })
        );
    }

    enviarImagem(pessoa: Pessoa) {
        return this.http.post(this.enviarImagemUrl, pessoa);
    }

    removerImagem(pessoa: Pessoa) {
        return this.http.post(this.removerImagemUrl, pessoa);
    }

    uploadPdf(pessoa: Pessoa, file: File) {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('pessoa', new Blob([JSON.stringify(pessoa)], { type: 'application/json' }));

        return this.http.post(this.uploadPdfUrl, formData, { headers: {'no-content-type': 'true'} }).pipe(
            tap((res: Pessoa) => {
                console.log(res);
                if (res) {
                    this.tratarDatas(res);
                }
                return res;
            })
        );
    }

    downloadPdf(nomeArquivo: String) {

        return this.http.get(encodeURI(this.downloadPdfUrl + nomeArquivo),
        { responseType: 'arraybuffer' }).pipe(
            map(res => {
                const blob = new Blob([res], { type: 'application/pdf' });
                const a: any = document.createElement('a');
                document.body.appendChild(a);
                a.style = 'display: none';
                a.target = "_blank";
                const url = window.URL.createObjectURL(blob);
                a.href = url;
                a.click();
                window.URL.revokeObjectURL(url);
            })
        );
    }
    
}
