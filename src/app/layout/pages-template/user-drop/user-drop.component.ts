import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { efetuarLogoutAction } from '../../../public/login/actions/login.actions';
import { Observable } from 'rxjs';
import { Usuario } from '../../../models/usuario';
import { selectUsuarioLogado } from '../../../public/login/selectors/login.selectors';
import { TipoUsuarioEnum } from '../../../enums/tipo.usuario';

declare var $: any;

@Component({
  selector: 'app-user-drop',
  templateUrl: './user-drop.component.html',
  styleUrls: ['./user-drop.component.scss']
})
export class UserDropComponent implements OnInit {

  tipo = TipoUsuarioEnum;
  usuarioLogado$: Observable<Usuario>;

  style: string;

  show: boolean;

  constructor(private elementRef: ElementRef,
              private store: Store<AppState>) {
    this.show = false;
  }

  ngOnInit() {
    this.usuarioLogado$ = this.store.pipe(select(selectUsuarioLogado));

    if (window.innerWidth < 1025) {
      this.style = 'dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl drop-user-mobile';
    } else {
      this.style = 'dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl drop-user';
    }
  }

  logout() {
    this.store.dispatch(efetuarLogoutAction());
  }

  showDropUser() {
    $('#idDropUser').addClass('show');
  }

  @HostListener('document:click', ['$event'])
  clickout($event) {
    const targetId = $event.target.id;

    if (!this.checkTargetIdIsUserComponent(targetId)) {

      const clickedInside = this.elementRef.nativeElement.contains($event.target);
      const idUser = $event.target.id;
      if (!clickedInside &&
            (idUser !== 'idBtnUser' && idUser !== 'idWelcomeUser')
              && idUser !== 'idNameUser' && idUser !== 'idImgUser' && idUser !== 'idDivUser') {
        $('#idDropUser').removeClass('show');
      }
    }
  }

  checkTargetIdIsUserComponent(targetId: string): boolean {
    return (targetId === 'idDivUser' || targetId === 'idWelcomeUser' || targetId === 'idImageUser');
  }

}
