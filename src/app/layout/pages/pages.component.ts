import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { selectFuncionalidadeAtiva } from '../../public/login/selectors/login.selectors';

declare var $: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  funcionalidadeAtiva$: Observable<any>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.funcionalidadeAtiva$ = this.store.pipe(select(selectFuncionalidadeAtiva));
  }

  openMobileMenu() {
    if ($('#kt_aside').hasClass('kt-aside--on')) {
      $('#kt_aside').removeClass('kt-aside--on');
    } else {
      $('#kt_aside').addClass('kt-aside--on');
    }
  }

  openUserMobileMenu() {
    if ($('body').hasClass('kt-header__topbar--mobile-on')) {
      $('body').removeClass('kt-header__topbar--mobile-on');
    } else {
      $('body').addClass('kt-header__topbar--mobile-on');
    }
  }

}
