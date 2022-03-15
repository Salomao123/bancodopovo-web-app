import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { selectExistFuncionalidade, selectFuncionalidadeAtiva } from '../../../public/login/selectors/login.selectors';
import { FuncionalidadeEnum } from '../../../enums/funcionalidade';
import { selecionarFuncionalidadeAction } from '../../../public/login/actions/login.actions';
import { MenuUtil } from '../../../util/menu.util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  funcionalidadeEnum = FuncionalidadeEnum;

  funcionalidadeAtiva$: Observable<any>;

  @Output()
  aposSelecionar: EventEmitter<any> = new EventEmitter();

  menus = MenuUtil.menus;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.funcionalidadeAtiva$ = this.store.pipe(select(selectFuncionalidadeAtiva));
  }

  permiteFuncionalidade(f: number): Observable<boolean> {
    return this.store.pipe(select(selectExistFuncionalidade(f)));
  }

  selecionarFuncionalidade(factive: number, fname: string) {
    this.store.dispatch(selecionarFuncionalidadeAction({ factive, fname }));
    this.aposSelecionar.emit();
  }

}
