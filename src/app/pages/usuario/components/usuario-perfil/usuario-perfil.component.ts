import { StatusRegistroEnum } from './../../../../enums/status.registro';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { Observable } from 'rxjs';
import { Perfil } from '../../../../models/perfil';
import { UsuarioPerfil } from '../../../../models/usuario-perfil';
import { BaseComponent } from '../../../base.components';
import { selectPerfisAtivos, selectUsuarioPerfilCount, selectUsuarioPerfilPageShow } from '../../selectors/usuario-perfil.selectors';
import { Usuario } from '../../../../models/usuario';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { recuperarPerfisAtivos, countUsuarioPerfil, pesquisarUsuarioPerfil, carregarDependenciasUsuarioPerfilParaSalvar, countUsuarioPerfilSucesso } from '../../actions/usuario-perfil.action';
import { PaginationLoadLazy } from '../../../../util/pagination';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent extends BaseComponent implements OnInit {

  @ViewChild('modal', { static: false })
  modal: ModalComponent;

  @ViewChild('usuarioPerfilForm', { static: false })
  form: NgForm;

  status = StatusRegistroEnum;

  perfis$: Observable<Array<Perfil>>;
  totalRegistros$: Observable<number>;
  registros$: Observable<Array<UsuarioPerfil>>;

  usuario: Usuario;
  idPerfilSelecionado: number;

  usuarioPerfil: UsuarioPerfil;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.perfis$ = this.store.pipe(select(selectPerfisAtivos));
    this.totalRegistros$ = this.store.pipe(select(selectUsuarioPerfilCount));
    this.registros$ = this.store.pipe(select(selectUsuarioPerfilPageShow));
  }

  carregar(usuario: Usuario) {
    this.store.dispatch(recuperarPerfisAtivos({ idUsuario: usuario.id }));

    this.idPerfilSelecionado = undefined;
    this.usuario = usuario;

    this.pesquisar();
    this.modal.open();
  }

  fechar() {
    this.form.resetForm();
    this.modal.close();

    this.store.dispatch(countUsuarioPerfilSucesso({ filter: undefined, count: 0, afterCount: () => {} }));
  }

  pesquisar() {
    const filtro = new UsuarioPerfil();
    filtro.usuario = new Usuario();
    filtro.usuario.id = this.usuario.id;

    this.store.dispatch(countUsuarioPerfil({ filter: filtro, afterCount: () => {} }));
  }

  loadPerfis(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarUsuarioPerfil({ page, sort }));
  }

  salvar() {
    if (this.form.valid) {
      this.usuarioPerfil = new UsuarioPerfil();

      this.usuarioPerfil.usuario = new Usuario();
      this.usuarioPerfil.usuario.id = this.usuario.id;
      this.usuarioPerfil.usuario.version = this.usuario.version;

      this.usuarioPerfil.perfil = new Perfil();
      this.usuarioPerfil.perfil.id = this.idPerfilSelecionado;

      this.store.dispatch(carregarDependenciasUsuarioPerfilParaSalvar({ registro: this.usuarioPerfil, afterSave: this.limparForm }));
    }
  }

  limparForm = () => {
    this.form.resetForm();
    this.idPerfilSelecionado = undefined;
  }

}
