import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import testeImpressaoCss from '../teste-impressao/teste-impressao.component.scss';
import { LevantamentosService } from '../../../../services/levantamentos.service';
import { EmprestimosService } from '../../../../services/emprestimos.service';
import { VisitasService } from '../../../../services/visitas.service';
import { Levantamento } from '../../../../models/levantamento';
import { Visita } from '../../../../models/visita';
import { Emprestimo } from '../../../../models/emprestimo';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { selectExistFuncionalidade, selectFuncionalidadeAtiva } from '../../../../public/login/selectors/login.selectors';
import { FuncionalidadeEnum } from '../../../../enums/funcionalidade';
import { selecionarFuncionalidadeAction } from '../../../../public/login/actions/login.actions';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  qtdVisitas: number;
  qtdLenvatamentos: number;
  qtdEmprestimos: number;

  funcionalidadeEnum = FuncionalidadeEnum;

  funcionalidadeAtiva$: Observable<any>;

  @Output()
  aposSelecionar: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<AppState>,
    private levantamentosService: LevantamentosService, 
    private emprestimosService: EmprestimosService,
    private visitasService: VisitasService) { }

  ngOnInit() {
    this.funcionalidadeAtiva$ = this.store.pipe(select(selectFuncionalidadeAtiva));
    this.qtdVisitas = 0;
    this.qtdLenvatamentos = 0;
    this.qtdEmprestimos = 0;
    this.levantamentosService.count(new Levantamento()).subscribe(
      valor => this.qtdLenvatamentos = valor,
      error => this.qtdLenvatamentos = 0);

    this.emprestimosService.count(new Emprestimo()).subscribe(
      valor => this.qtdEmprestimos = valor,
      error => this.qtdEmprestimos = 0);

    this.visitasService.count(new Visita()).subscribe(
      valor => this.qtdVisitas = valor,
      error => this.qtdVisitas = 0);
    console.log(this.qtdLenvatamentos);
  }

  permiteFuncionalidade(f: number): Observable<boolean> {
    return this.store.pipe(select(selectExistFuncionalidade(f)));
  }

  selecionarFuncionalidade(factive: number, fname: string) {
    this.store.dispatch(selecionarFuncionalidadeAction({ factive, fname }));
    this.aposSelecionar.emit();
  }

  getCss() {
    return testeImpressaoCss;
  }

}
