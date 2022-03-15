import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from '../../../../models/pessoa';
import { PessoaService } from '../../../../services/pessoa.service';
import { EventosService } from '../../../../services/eventos.service';
import { Participante } from '../../../../models/participante';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Store, select } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';
import { AppState } from '../../../../reducers/index';
import { adicionarParticipante, excluirParticipante, countParticipante, countParticipanteSucesso, pesquisarParticipante } from '../../actions/eventos.action';
import swal from 'sweetalert';
import { selectParticipanteCount, selectParticipantesPage, selectParticipantesPageShow } from '../../selectors/participantes.selectors';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { BaseComponent } from '../../../base.components';
import { PaginationLoadLazy, PageQuery } from '../../../../util/pagination';

import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-eventos-participantes',
  templateUrl: './eventos-participantes.component.html',
  styleUrls: ['./eventos-participantes.component.scss']
})
export class EventosParticipantesComponent extends BaseComponent implements OnInit, OnDestroy {

  pessoaCtrl = new FormControl();

  @ViewChild('participantesTable', { static: false })
  tableParticipantes: Table;

  pessoas: Pessoa[];
  pessoasFiltered: Observable<Pessoa[]>;
  documentoPessoa: string;
  filtro: Participante = new Participante();
  idEvento: number;
  pessoa: Pessoa = new Pessoa();
  totalRecordsParticipante$: Observable<number>;
  participantes$: Observable<Array<Participante>>;
  pt: Object = languageCalendar

  constructor(private store: Store<AppState>, private pessoaService: PessoaService, 
    private eventosService: EventosService, private route: ActivatedRoute) {
    super(store);
   }

  ngOnInit() {    
    this.totalRecordsParticipante$ = this.store.pipe(select(selectParticipanteCount));
    this.participantes$ = this.store.pipe(select(selectParticipantesPageShow));
    console.log('ngOnInit');
    this.route.queryParams.subscribe(params => {
        this.idEvento = params['idEvento'];
        console.log(params['idEvento']);
        if (this.idEvento) {
          this.filtro = new Participante();
          this.filtro.idEvento = this.idEvento;
          console.log(this.filtro);
          this.pesquisar();
          this.pessoaService.recuperarPessoas().subscribe(
            ps => this.carregarPessoas(ps),
            error => this.addMessageError(error));
        } else {
          this.addMessageError({ error: { message: 'Não é possível acessar a página sem ter selecionado um evento.' } });
        }
    });
    
  }

  private carregarPessoas(ps: Pessoa[]) {
    console.log(ps);
    this.pessoas = ps;

    this.pessoasFiltered = this.pessoaCtrl.valueChanges.pipe(
      startWith(''),
      map(filter => filter ? this._filterPessoas(filter) : this.pessoas.slice())
    );
  }

  private _filterPessoas(value: string): Pessoa[] {
    this.documentoPessoa = value;
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.pessoas.filter(pessoa => (pessoa.nome != null && pessoa.nome.toLowerCase().indexOf(filterValue) === 0) 
      || (pessoa.documento != null && pessoa.documento.indexOf(filterValue) === 0)
      || (pessoa.nomeFantasia != null && pessoa.nomeFantasia.toLowerCase().indexOf(filterValue) === 0));
  }

  pesquisar() {
    this.store.dispatch(countParticipante({ filter: this.filtro, afterCount: () => {} }));
  }

  clearTable = () => {
    console.log('clear table');
    super.resetTable(this.tableParticipantes);
  }

  loadPessoas(event: PaginationLoadLazy) {
    console.log('loadPessoas');
    const page = super.pageQuery(event);
    const sort = super.sortQuery(event);

    this.store.dispatch(pesquisarParticipante({ page, sort }));
  }

  carregarPessoa(event: MatAutocompleteSelectedEvent) {
    this.pessoaService.recuperarPorCPF(this.documentoPessoa).subscribe(p => this.definirPessoa(p));
    //this.pessoasFiltered = of(this.pessoas);
    this.documentoPessoa = null;
    /*if (this.pessoa.documento == null || this.pessoa.documento.length != 14) {
      this.addMessageError({ error: { message: 'O CPF é obrigatório e deve conter 11 números.' } });
    } else {
      this.pessoaService.recuperarPorCPF(this.pessoa.documento).subscribe(p => this.definirPessoa(p));
    }*/
  }

  private definirPessoa(p: Pessoa) {
    if (!p) {
      this.addMessageError({ error: { message: 'Nenhuma pessoa cadastrada com esse CPF ainda. Cadastre essa pessoa na funcionalidade de "Pessoas"' } });
    } else {
      if (p.status == StatusRegistroEnum.ATIVO) {
        this.pessoa = p;
      } else {
        this.addMessageError({ error: { message: 'A Pessoa precisa estar ativa no sistema para ser utilizada em outras funcionalidades.' } });
      }
    }
  }

  salvar() {
    if (this.pessoa.documento) {
      var participante = new Participante();
      participante.idPessoa = this.pessoa.id;
      participante.idEvento = this.idEvento;
      this.eventosService.salvarParticipante(participante).subscribe(
        p => this.processarParticipante(p),
        error => this.addMessageError(error));
    } else {
      this.addMessageError({ error: { message: 'O CPF é obrigatório.' } });
    }
  }

  private processarParticipante(p: Participante) {
    if (p) {
      swal({
        text: 'Participante adicionado com sucesso.',
        icon: 'success',
        buttons: ['Fechar', false]
      });
      this.pessoa = new Pessoa();
    }
    this.pesquisar();
    this.clearTable();
  }

  private processarParticipanteExclusao() {
    swal({
      text: 'Participante excluído com sucesso.',
      icon: 'success',
      buttons: ['Fechar', false]
    });
    this.pesquisar();
    this.clearTable();
  }

  excluir(participante: Participante) {
    this.eventosService.excluirParticipante(participante).subscribe(
      p => this.processarParticipanteExclusao(),
      error => this.addMessageError(error));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy 2');
    var participante = new Participante();
    participante.idEvento = this.idEvento;
    this.store.dispatch(countParticipanteSucesso({ filter: undefined, count: 0, afterCount: () => {} }));
  }

}
