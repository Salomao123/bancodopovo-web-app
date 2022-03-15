import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../../../models/usuario';
import { TipoUsuarioEnum } from '../../../../enums/tipo.usuario';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { consultarPessoasFisicas, consultarEmpresas, consultarEmpresasConsignatarias, consultarEmpregadosConsignantes, carregarDependenciasParaSalvarUsuario } from '../../actions/usuario.action';
import { Observable } from 'rxjs';
import { Pessoa } from '../../../../models/pessoa';
import { selectPessoasFisicas, selectEmpresas, selectEmpresasConsignatarias, selectEmpregadosEmpresaSelecionada } from '../../selectors/usuario.selectors';
import { BaseComponent } from '../../../base.components';
import { Empresa } from '../../../../models/empresa';
import { EmpresaConsignataria } from 'src/app/models/empresa-consignataria';
import { EmpregadoConsignante } from 'src/app/models/empregado-consignante';

@Component({
  selector: 'app-usuario-novo',
  templateUrl: './usuario-novo.component.html',
  styleUrls: ['./usuario-novo.component.scss']
})
export class UsuarioNovoComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('usuarioNovoForm', { static: false })
  form: NgForm;

  pessoas$: Observable<Pessoa[]>;
  empresas$: Observable<Empresa[]>;
  empresasConsignatarias$: Observable<EmpresaConsignataria[]>;
  empregadosConsignantes$: Observable<EmpregadoConsignante[]>;

  usuario: Usuario;
  idPessoa: number;
  idEmpresa: number;
  idEmpresaConsignataria: number;
  idEmpregadoConsignante: number;
  confirmacaoEmail: string;

  tipoUsuario = TipoUsuarioEnum;
  status = StatusRegistroEnum;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.pessoas$ = this.store.pipe(select(selectPessoasFisicas));
    this.empresas$ = this.store.pipe(select(selectEmpresas));
    this.empresasConsignatarias$ = this.store.pipe(select(selectEmpresasConsignatarias));
    this.empregadosConsignantes$ = this.store.pipe(select(selectEmpregadosEmpresaSelecionada));
  }

  changeTipoUsuario() {
    if (this.tipoUsuario.CONSIGNANTE === this.usuario.tipo || this.tipoUsuario.ORGAO_EMPRESA === this.usuario.tipo) {
      this.store.dispatch(consultarEmpresas());
    }

    // Se tipo for diference de consignante
    if (this.tipoUsuario.CONSIGNANTE !== this.usuario.tipo) {

      if (this.tipoUsuario.CONSIGNATARIO === this.usuario.tipo) {
        this.store.dispatch(consultarEmpresasConsignatarias());
      }

      this.store.dispatch(consultarPessoasFisicas());
    }
  }

  changeEmpresa() {
    this.store.dispatch(consultarEmpregadosConsignantes({ idEmpresa: this.idEmpresa }));
  }

  adicionar() {
    this.confirmacaoEmail = undefined;
    this.idPessoa = undefined;
    this.idEmpresa = undefined;
    this.idEmpregadoConsignante = undefined;
    this.idEmpresaConsignataria = undefined;

    this.usuario = new Usuario();
    this.usuario.status = this.status.ATIVO;

    this.modal.open();
  }

  editar(usuario: Usuario) {
    this.confirmacaoEmail = usuario.login;

    if (usuario.pessoa) {
      this.idPessoa = usuario.pessoa.id;
    }

    if (usuario.empresa) {
      this.idEmpresa = usuario.empresa.id;
    }

    if (usuario.empresaConsignataria) {
      this.idEmpresaConsignataria = usuario.empresaConsignataria.id;
    }

    if (usuario.empregadoConsignante) {
      this.idEmpregadoConsignante = usuario.empregadoConsignante.id;
      this.changeEmpresa();
    }

    this.usuario = Object.assign({}, usuario);
    this.changeTipoUsuario();
    this.modal.open();
  }

  salvar() {
    if (this.form.valid) {
      // validar confirmação de e-mail
      if (this.usuario.login === this.confirmacaoEmail) {
        this.carregarDependencias();
        this.store.dispatch(carregarDependenciasParaSalvarUsuario(
          { registro: Object.assign({}, this.usuario), afterSave: this.fecharModal }));
      } else {
        super.addMessageError({
          error: {
            message: 'O \'E-mail (Login)\' e a \'Confirmação do E-mail (Login)\' devem ser iguais.'
          }
        });
      }
    }
  }

  carregarDependencias() {
    this.usuario.pessoa = new Pessoa();
    this.usuario.pessoa.id = this.idPessoa;

    this.usuario.empresa = new Empresa();
    this.usuario.empresa.id = this.idEmpresa;

    this.usuario.empregadoConsignante = new EmpregadoConsignante();
    this.usuario.empregadoConsignante.id = this.idEmpregadoConsignante;

    this.usuario.empresaConsignataria = new EmpresaConsignataria();
    this.usuario.empresaConsignataria.id = this.idEmpresaConsignataria;
  }

  fecharModal = () => {
    this.form.resetForm();
    this.modal.close();
  }

}
