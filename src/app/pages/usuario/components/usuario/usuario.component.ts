import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { TipoUsuarioEnum } from '../../../../enums/tipo.usuario';
import { Usuario } from '../../../../models/usuario';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectUsuarioCount, selectUsuariosPageShow } from '../../selectors/usuario.selectors';
import { Pessoa } from '../../../../models/pessoa';
import { countUsuarioSucesso, countUsuario, pesquisarUsuario, recuperarPorIdUsuario } from '../../actions/usuario.action';
import { PaginationLoadLazy } from '../../../../util/pagination';
import { BaseComponent } from '../../../base.components';
import { Table } from 'primeng/table';
import { UsuarioNovoComponent } from '../usuario-novo/usuario-novo.component';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild('usuariosTable', { static: false })
  tableUsuarios: Table;

  @ViewChild('usuarioNovo', { static: false })
  usuarioNovo: UsuarioNovoComponent;

  status = StatusRegistroEnum;
  tipo = TipoUsuarioEnum;
  pt: Object = languageCalendar

  filtro: Usuario;
  filtroPessoa: Pessoa;

  totalRecords$: Observable<number>;
  usuarios$: Observable<Array<Usuario>>;

  constructor(private store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {
    this.totalRecords$ = this.store.pipe(select(selectUsuarioCount));
    this.usuarios$ = this.store.pipe(select(selectUsuariosPageShow));

    this.limparFiltro();
  }

  ngOnDestroy() {
    this.store.dispatch(countUsuarioSucesso({ filter: new Usuario(), count: 0, afterCount: this.clearTable }));
  }

  limparFiltro() {
    this.filtro = new Usuario();
    this.filtroPessoa = new Pessoa();

    this.pesquisar();
  }

  pesquisar() {
    this.filtro.pessoa = Object.assign({}, this.filtroPessoa);
    this.store.dispatch(countUsuario({ filter: Object.assign({}, this.filtro), afterCount: this.clearTable }));
  }

  clearTable = () => {
    super.resetTable(this.tableUsuarios);
  }

  loadUsuarios(event: PaginationLoadLazy) {
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarUsuario({ page, sort }));
  }

  editarUsuario(id: number) {
    this.store.dispatch(recuperarPorIdUsuario({ id, afterConsulta: this.carregarEdicao }));
  }

  carregarEdicao = (usuario: Usuario) => {
    this.usuarioNovo.editar(usuario);
  }
}
