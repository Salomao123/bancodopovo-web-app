import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../common/components/modal/modal.component';
import { Visita } from '../../../../models/visita';
import { PessoaService } from '../../../../services/pessoa.service';
import { Pessoa } from '../../../../models/pessoa';
import { NgForm } from '@angular/forms';
import { StatusRegistroEnum } from '../../../../enums/status.registro';
import { Store } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';
import { AppState } from '../../../../reducers/index';
import { BaseComponent } from '../../../base.components';
import { salvarVisita } from '../../actions/visitas.action';
import { Observable } from 'rxjs';

import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import {languageCalendar} from "../../../../../app/util/languageCalendar"


@Component({
  selector: 'app-visitas-novo',
  templateUrl: './visitas-novo.component.html',
  styleUrls: ['./visitas-novo.component.scss']
})
export class VisitasNovoComponent extends BaseComponent implements OnInit, OnDestroy {

  pessoaCtrl = new FormControl();

  @ViewChild('modal', { static: true })
  modal: ModalComponent;

  @ViewChild('visitasNovoForm', { static: false })
  form: NgForm;

  pessoas: Pessoa[];
  pessoasFiltered: Observable<Pessoa[]>;
  documentoPessoa: string;
  visita: Visita = new Visita();
  pessoa: Pessoa = new Pessoa();
  pt: Object = languageCalendar
  dataHoje: Date = new Date()
  maxDate: Date = new Date(2100,1,1)

  constructor(private store: Store<AppState>,
    private pessoaService: PessoaService,) {
      super(store);
     }

  ngOnInit() {
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

  adicionar() {
    this.pessoaService.recuperarPessoas().subscribe(
      ps => this.carregarPessoas(ps),
      error => this.addMessageError(error));
    this.visita = new Visita();
    this.pessoa = new Pessoa();
    this.modal.open();
  }

  editar(visita: Visita) {
    this.visita = Object.assign({}, visita);
    this.tratarDatas(this.visita);
    this.pessoa = Object.assign({}, this.visita.pessoa);
    if ( this.pessoa && this.pessoa.dataNascimento) {
      this.pessoa.dataNascimento = new Date(this.pessoa.dataNascimento);
    }

    this.modal.open();
  }

  private tratarDatas(visita: Visita) {
    if (visita.dataCadastro) {
        visita.dataCadastro = new Date(visita.dataCadastro);
    }

    if (visita.dataAtualizacao) {
        visita.dataAtualizacao = new Date(visita.dataAtualizacao);
    }

    if (visita.dataVisita) {
        visita.dataVisita = new Date(visita.dataVisita);
    }
  }

  salvar() {
    if (this.form.valid) {
      this.visita.idPessoa = this.pessoa.id;
      this.visita.status = 1;
      this.store.dispatch(salvarVisita({ registro: Object.assign({}, this.visita), afterSave: this.fecharModal }));
    } else {
      if (this.pessoa == null || this.pessoa.id == null) {
        this.addMessageError({ error: { message: 'O CPF é obrigatório e deve conter 11 números.' } });
      } else if (this.visita.dataVisita == null) {
        this.addMessageError({ error: { message: 'A Data de Visita é obrigatória.' } });
      } else if (this.visita.descricao == null) {
        this.addMessageError({ error: { message: 'A Descrição é obrigatória.' } });
      }
    }
  }

  fecharModal = () => {
    this.form.resetForm();
    this.modal.close();
  }

  carregarPessoa(/*event: MatAutocompleteSelectedEvent*/) {
    //this.pessoaService.recuperarPorCPF(this.documentoPessoa).subscribe(p => this.definirPessoa(p));
    //this.pessoasFiltered = of(this.pessoas);
    //this.documentoPessoa = null;
    if (this.pessoa.documento == null || this.pessoa.documento.length != 14) {
      this.addMessageError({ error: { message: 'O CPF é obrigatório e deve conter 11 números.' } });
    } else {
      this.pessoaService.recuperarPorCPF(this.pessoa.documento).subscribe(p => this.definirPessoa(p));
    }
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

  ngOnDestroy() {
    console.log('ngOnDestroy 2');
    this.visita = new Visita();
  }

}
