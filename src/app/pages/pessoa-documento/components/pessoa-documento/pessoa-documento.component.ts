import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Levantamento } from '../../../../models/levantamento';
import { PessoaService } from '../../../../services/pessoa.service';
import { Pessoa } from '../../../../models/pessoa';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { countLevantamento, pesquisarLevantamento, atualiarStatusLevantamento, countLevantamentoSucesso, pesquisarPessoaId } from '../../actions/pessoa-documento.action';
import { Observable } from 'rxjs';
import { selectLevantamentoCount, selectLevantamentosPage, selectLevantamentosPageShow, selectPessoaFisicaSelecionada } from '../../selectors/pessoa-documento.selectors';
import { PaginationLoadLazy, PageQuery } from '../../../../util/pagination';
import { tap } from 'rxjs/operators';
import { Table } from 'primeng/table';
import { BaseComponent } from '../../../base.components';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { EstadoCivilEnum } from '../../../../enums/estado.civil';

import '../../../../../assets/js/global/util.js';

declare var abrirModalImg: any;

@Component({
  selector: 'app-pessoa-documento',
  templateUrl: './pessoa-documento.component.html',
  styleUrls: ['./pessoa-documento.component.scss']
})
export class PessoaDocumentoComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('levantamentosTable', { static: false })
  tableLevantamentos: Table;

  idPessoa: number;
  pessoa: Pessoa = new Pessoa();
  filtro: Levantamento;
  status = StatusRegistroEnum;
  estadoCivil = EstadoCivilEnum;

  fileDocumentoFoto: File;
  imageDocumentoFoto: String;
  fileDocumentoFotoVerso: File;
  imageDocumentoFotoVerso: String;
  fileTituloEleitor: File;
  imageTituloEleitor: String;
  fileTituloEleitorVerso: File;
  imageTituloEleitorVerso: String;
  fileDocumento3x4: File;
  image3x4: String;
  fileComprovanteResidencia: File;
  imageComprovanteResidencia: String;
  fileComprovanteResidenciaVerso: File;
  imageComprovanteResidenciaVerso: String;
  fileExtratoBancario: File;
  imageExtratoBancario: String;
  fileCertidaoCasamentoFrente: File;
  imageCertidaoCasamentoFrente: String;
  fileCertidaoCasamentoVerso: File;
  imageCertidaoCasamentoVerso: String;
  fileCartaoBanco: File;
  imageCartaoBanco: String;
  fileCPF: File;
  imageCPF: String;

  fileCartaoCNPJ: File;
  imageCartaoCNPJ: String;
  fileAlvaraFuncionamento: File;
  imageAlvaraFuncionamento: String;
  fileLicencaMeioAmbiente: File;
  imageLicencaMeioAmbiente: String;
  fileLicencaVigilanciaSanitaria: File;
  imageLicencaVigilanciaSanitaria: String;

  fileCartaoBancoPj: File;
  imageCartaoBancoPj: String;
  fileExtratoBancarioPj: File;
  imageExtratoBancarioPj: String;

  fileComprovanteRenda: File;
  imageComprovanteRenda: String;
  fileComprovanteRenda2: File;
  imageComprovanteRenda2: String;

  fileContratoSocial: File;
  imageContratoSocial: String;
  fileBalancoPatrimonial: File;
  imageBalancoPatrimonial: String;
  fileFaturamento: File;
  imageFaturamento: String;

  totalRecords$: Observable<number>;
  levantamentos$: Observable<Array<Levantamento>>;

  abrirModalImgZoom(idImg : String) {
    abrirModalImg(idImg);
  }

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private pessoaService: PessoaService) {
    super(store);
  }

  ngOnInit() {
    window.scroll(0, 0);
    //this.totalRecords$ = this.store.pipe(select(selectLevantamentoCount));
    //this.levantamentos$ = this.store.pipe(select(selectLevantamentosPageShow));
    //this.limparFiltro();
    this.route.queryParams.subscribe(params => {
        this.idPessoa = params['idPessoa'];
        console.log(params['idPessoa']);
        if (this.idPessoa) {
            this.pessoaService.recuperarPorId(this.idPessoa).subscribe(
              p => this.preencherDadosPessoa(p),
              error => this.addMessageError(error));
        }
    });
  }

  preencherDadosPessoa(p: Pessoa) {
    this.pessoa = p;
    this.imageCPF = this.pessoa.imgCpf;
    this.image3x4 = this.pessoa.img3x4;
    this.imageDocumentoFoto = this.pessoa.imgDocumentoFotoFrente;
    this.imageDocumentoFotoVerso = this.pessoa.imgDocumentoFotoVerso;
    this.imageTituloEleitor = this.pessoa.imgTituloEleitorFrente;
    this.imageTituloEleitorVerso = this.pessoa.imgTituloEleitorVerso;
    this.imageComprovanteResidencia = this.pessoa.imgComprovanteResidenciaFrente;
    this.imageComprovanteResidenciaVerso = this.pessoa.imgComprovanteResidenciaVerso;
    this.imageExtratoBancario = this.pessoa.imgExtratoBancario;
    this.imageCertidaoCasamentoFrente = this.pessoa.imgCertidaoCasamentoFrente;
    this.imageCertidaoCasamentoVerso = this.pessoa.imgCertidaoCasamentoVerso;
    this.imageCartaoBanco = this.pessoa.imgCartaoBanco;

    this.imageCartaoCNPJ = this.pessoa.imgCartaoCNPJ;
    this.imageAlvaraFuncionamento = this.pessoa.imgAlvaraFuncionamento;
    this.imageLicencaMeioAmbiente = this.pessoa.imgLicencaMeioAmbiente;
    this.imageLicencaVigilanciaSanitaria = this.pessoa.imgLicencaVigilanciaSanitaria;

    this.imageCartaoBancoPj = this.pessoa.imgCartaoBancoPj;
    this.imageExtratoBancarioPj = this.pessoa.imgExtratoBancarioPj;

    this.imageComprovanteRenda = this.pessoa.imgComprovanteRenda;
    this.imageComprovanteRenda2 = this.pessoa.imgComprovanteRenda2;
  }

  excluirFoto3x4() {
    this.fileDocumento3x4 = null;
    let p = new Pessoa();
        p.img3x4 = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.image3x4 = null,
          error => this.addMessageError(error));
  }

  excluirCPF() {
    this.fileCPF = null;
    let p = new Pessoa();
        p.imgCpf = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageCPF = null,
          error => this.addMessageError(error));
  }

  excluirCartaoBanco() {
    this.fileCartaoBanco = null;
    let p = new Pessoa();
        p.imgCartaoBanco = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageCartaoBanco = null,
          error => this.addMessageError(error));
  }

  excluirComprovanteResidenciaFrente() {
    this.fileComprovanteResidencia = null;
    let p = new Pessoa();
        p.imgComprovanteResidenciaFrente = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageComprovanteResidencia = null,
          error => this.addMessageError(error));
  }

  excluirComprovanteResidenciaVerso() {
    this.fileComprovanteResidenciaVerso = null;
    let p = new Pessoa();
        p.imgComprovanteResidenciaVerso = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageComprovanteResidenciaVerso = null,
          error => this.addMessageError(error));
  }

  excluirExtratoBancario() {
    this.fileExtratoBancario = null;
    let p = new Pessoa();
        p.imgExtratoBancario = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageExtratoBancario = null,
          error => this.addMessageError(error));
  }

  excluirCertidaoCasamentoFrente() {
    this.fileCertidaoCasamentoFrente = null;
    let p = new Pessoa();
        p.imgCertidaoCasamentoFrente = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageCertidaoCasamentoFrente = null,
          error => this.addMessageError(error));
  }

  excluirCertidaoCasamentoVerso() {
    this.fileCertidaoCasamentoVerso = null;
    let p = new Pessoa();
        p.imgCertidaoCasamentoVerso = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageCertidaoCasamentoVerso = null,
          error => this.addMessageError(error));
  }

  excluirTituloEleitorFrente() {
    this.fileTituloEleitor = null;
    let p = new Pessoa();
        p.imgTituloEleitorFrente = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageTituloEleitor = null,
          error => this.addMessageError(error));
  }

  excluirTituloEleitorVerso() {
    this.fileTituloEleitorVerso = null;
    let p = new Pessoa();
        p.imgTituloEleitorVerso = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageTituloEleitorVerso = null,
          error => this.addMessageError(error));
  }

  excluirDocumentoFotoFrente() {
    this.fileDocumentoFoto = null;
    let p = new Pessoa();
        p.imgDocumentoFotoFrente = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageDocumentoFoto = null,
          error => this.addMessageError(error));
  }

  excluirDocumentoFotoVerso() {
    this.fileDocumentoFotoVerso = null;
    let p = new Pessoa();
        p.imgDocumentoFotoVerso = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageDocumentoFotoVerso = null,
          error => this.addMessageError(error));
  }

  excluirCartaoCNPJ() {
    this.fileCartaoCNPJ = null;
    let p = new Pessoa();
        p.imgCartaoCNPJ = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageCartaoCNPJ = null,
          error => this.addMessageError(error));
  }

  excluirAlvaraFuncionamento() {
    this.fileAlvaraFuncionamento = null;
    let p = new Pessoa();
        p.imgAlvaraFuncionamento = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageAlvaraFuncionamento = null,
          error => this.addMessageError(error));
  }

  excluirLicencaMeioAmbiente() {
    this.fileLicencaMeioAmbiente = null;
    let p = new Pessoa();
        p.imgLicencaMeioAmbiente = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageLicencaMeioAmbiente = null,
          error => this.addMessageError(error));
  }

  excluirLicencaVigilanciaSanitaria() {
    this.fileLicencaVigilanciaSanitaria = null;
    let p = new Pessoa();
        p.imgLicencaVigilanciaSanitaria = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageLicencaVigilanciaSanitaria = null,
          error => this.addMessageError(error));
  }

  excluirExtratoBancarioPj() {
    this.fileExtratoBancarioPj = null;
    let p = new Pessoa();
        p.imgExtratoBancarioPj = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageExtratoBancarioPj = null,
          error => this.addMessageError(error));
  }

  excluirCartaoBancoPj() {
    this.fileCartaoBancoPj = null;
    let p = new Pessoa();
        p.imgCartaoBancoPj = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageCartaoBancoPj = null,
          error => this.addMessageError(error));
  }

  excluirComprovanteRenda() {
    this.fileComprovanteRenda = null;
    let p = new Pessoa();
        p.imgComprovanteRenda = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageComprovanteRenda = null,
          error => this.addMessageError(error));
  }

  excluirComprovanteRenda2() {
    this.fileComprovanteRenda2 = null;
    let p = new Pessoa();
        p.imgComprovanteRenda2 = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageComprovanteRenda2 = null,
          error => this.addMessageError(error));
  }

  excluirContratoSocial() {
    this.fileContratoSocial = null;
    let p = new Pessoa();
        p.contratoSocialCertMei = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageContratoSocial = null,
          error => this.addMessageError(error));
  }

  excluirBalancoPatrimonial() {
    this.fileBalancoPatrimonial = null;
    let p = new Pessoa();
        p.balancoPatrimonialIr = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageBalancoPatrimonial = null,
          error => this.addMessageError(error));
  }

  excluirFaturamento() {
    this.fileFaturamento = null;
    let p = new Pessoa();
        p.faturamentoUltimos6Meses = "1";
        p.id = this.pessoa.id;
        this.pessoaService.removerImagem(p).subscribe(
          p => this.imageFaturamento = null,
          error => this.addMessageError(error));
  }

  selectFile(event) {
    this.fileDocumentoFoto = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgDocumentoFotoFrente = reader.result.toString();
        p.id = this.pessoa.id;
        this.pessoaService.enviarImagem(p).subscribe(
          p => this.imageDocumentoFoto = reader.result.toString(),
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileDocumentoFoto);
  }

  selectFileCPF(event) {
    this.fileCPF = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgCpf = reader.result.toString();
        p.id = this.pessoa.id;
        this.pessoaService.enviarImagem(p).subscribe(
          p => this.imageCPF = reader.result.toString(),
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileCPF);
  }

  selectFileCartaoBanco(event) {
    this.fileCartaoBanco = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgCartaoBanco = reader.result.toString();
        p.id = this.pessoa.id;
        this.pessoaService.enviarImagem(p).subscribe(
          p => this.imageCartaoBanco = reader.result.toString(),
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileCartaoBanco);
  }

  selectFileVerso(event) {
    this.fileDocumentoFotoVerso = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgDocumentoFotoVerso = reader.result.toString();
        p.id = this.pessoa.id;
        this.pessoaService.enviarImagem(p).subscribe(
          p => this.imageDocumentoFotoVerso = reader.result.toString(),
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileDocumentoFotoVerso);
  }

  selectFileTituloEleitor(event) {
    this.fileTituloEleitor = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgTituloEleitorFrente = reader.result.toString();
        p.id = this.pessoa.id;
        this.pessoaService.enviarImagem(p).subscribe(
          p => this.imageTituloEleitor = reader.result.toString(),
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileTituloEleitor);
  }

  selectFileTituloEleitorVerso(event) {
    this.fileTituloEleitorVerso = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgTituloEleitorVerso = reader.result.toString();
        p.id = this.pessoa.id;
        this.pessoaService.enviarImagem(p).subscribe(
          p => this.imageTituloEleitorVerso = reader.result.toString(),
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileTituloEleitorVerso);
  }

  selectFileCertidaoCasamentoFrente(event) {
    this.fileCertidaoCasamentoFrente = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgCertidaoCasamentoFrente = reader.result.toString();
        p.id = this.pessoa.id;
        this.pessoaService.enviarImagem(p).subscribe(
          p => this.imageCertidaoCasamentoFrente = reader.result.toString(),
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileCertidaoCasamentoFrente);
  }

  selectFileCertidaoCasamentoVerso(event) {
    this.fileCertidaoCasamentoVerso = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgCertidaoCasamentoVerso = reader.result.toString();
        p.id = this.pessoa.id;
        this.pessoaService.enviarImagem(p).subscribe(
          p => this.imageCertidaoCasamentoVerso = reader.result.toString(),
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileCertidaoCasamentoVerso);
  }

  selectFile3x4(event) {
    this.fileDocumento3x4 = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.img3x4 = reader.result.toString();
        p.id = this.pessoa.id;
        this.pessoaService.enviarImagem(p).subscribe(
          p => this.image3x4 = reader.result.toString(),
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileDocumento3x4);
  }

  selectFileComprovanteResidencia(event) {
    this.fileComprovanteResidencia = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgComprovanteResidenciaFrente = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileComprovanteResidencia).subscribe(
          (p: Pessoa) => { this.imageComprovanteResidencia = p.imgComprovanteResidenciaFrente; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileComprovanteResidencia);
  }

  selectFileComprovanteResidenciaVerso(event) {
    this.fileComprovanteResidenciaVerso = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgComprovanteResidenciaVerso = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileComprovanteResidenciaVerso).subscribe(
          (p: Pessoa) => { this.imageComprovanteResidenciaVerso = p.imgComprovanteResidenciaVerso; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileComprovanteResidenciaVerso);
  }

  selectFileExtratoBancario(event) {
    this.fileExtratoBancario = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgExtratoBancario = reader.result.toString();
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileExtratoBancario).subscribe(
          (p: Pessoa) => { this.imageExtratoBancario = p.imgExtratoBancario; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileExtratoBancario);
  }

  selectFileCartaoCNPJ(event) {
    this.fileCartaoCNPJ = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgCartaoCNPJ = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileCartaoCNPJ).subscribe(
          (p: Pessoa) => { this.imageCartaoCNPJ = p.imgCartaoCNPJ; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileCartaoCNPJ);
  }

  selectFileAlvaraFuncionamento(event) {
    this.fileAlvaraFuncionamento = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgAlvaraFuncionamento = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileAlvaraFuncionamento).subscribe(
          (p: Pessoa) => { this.imageAlvaraFuncionamento = p.imgAlvaraFuncionamento; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileAlvaraFuncionamento);
  }

  selectFileLicencaMeioAmbiente(event) {
    this.fileLicencaMeioAmbiente = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgLicencaMeioAmbiente = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileLicencaMeioAmbiente).subscribe(
          (p: Pessoa) => { this.imageLicencaMeioAmbiente = p.imgLicencaMeioAmbiente; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileLicencaMeioAmbiente);
  }

  selectFileLicencaVigilanciaSanitaria(event) {
    this.fileLicencaVigilanciaSanitaria = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgLicencaVigilanciaSanitaria = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileLicencaVigilanciaSanitaria).subscribe(
          (p: Pessoa) => { this.imageLicencaVigilanciaSanitaria = p.imgLicencaVigilanciaSanitaria; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileLicencaVigilanciaSanitaria);
  }

  selectFileExtratoBancarioPj(event) {
    this.fileExtratoBancarioPj = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgExtratoBancarioPj = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileExtratoBancarioPj).subscribe(
          (p: Pessoa) => { this.imageExtratoBancarioPj = p.imgExtratoBancarioPj; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileExtratoBancarioPj);
  }

  selectFileCartaoBancoPj(event) {
    this.fileCartaoBancoPj = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgCartaoBancoPj = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileCartaoBancoPj).subscribe(
          (p: Pessoa) => { this.imageCartaoBancoPj = p.imgCartaoBancoPj; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileCartaoBanco);
  }

  selectFileComprovanteRenda(event) {
    this.fileComprovanteRenda = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgComprovanteRenda = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileComprovanteRenda).subscribe(
          (p: Pessoa) => { this.imageComprovanteRenda = p.imgComprovanteRenda; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileComprovanteRenda);
  }

  selectFileComprovanteRenda2(event) {
    this.fileComprovanteRenda2 = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.imgComprovanteRenda2 = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileComprovanteRenda2).subscribe(
          (p: Pessoa) => { this.imageComprovanteRenda2 = p.imgComprovanteRenda2; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileComprovanteRenda2);
  }

  selectFileContratoSocial(event) {
    this.fileContratoSocial = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.contratoSocialCertMei = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileContratoSocial).subscribe(
          (p: Pessoa) => { this.imageContratoSocial = p.contratoSocialCertMei; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileContratoSocial);
  }

  selectFileBalancoPatrimonial(event) {
    this.fileBalancoPatrimonial = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.balancoPatrimonialIr = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileBalancoPatrimonial).subscribe(
          (p: Pessoa) => { this.imageBalancoPatrimonial = p.balancoPatrimonialIr; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileBalancoPatrimonial);
  }

  selectFileFaturamento(event) {
    this.fileFaturamento = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (reader.result) {
        let p = new Pessoa();
        p.faturamentoUltimos6Meses = 'I';
        p.id = this.pessoa.id;
        this.pessoaService.uploadPdf(p, this.fileFaturamento).subscribe(
          (p: Pessoa) => { this.imageFaturamento = p.faturamentoUltimos6Meses; },
          error => this.addMessageError(error));
      }
    }
    reader.readAsDataURL(this.fileFaturamento);
  }

  download(arquivoPdf: String) {
    this.pessoaService.downloadPdf(this.pessoa.id.toString() + '/' + arquivoPdf).subscribe();
  }

  ngOnDestroy() {
    this.store.dispatch(countLevantamentoSucesso({ filter: new Levantamento(), count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new Levantamento();
    //this.pesquisar();
  }

  pesquisar() {
    this.store.dispatch(countLevantamento({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tableLevantamentos);
  }

  loadLevantamentos(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarLevantamento({ page, sort }));
  }

}
