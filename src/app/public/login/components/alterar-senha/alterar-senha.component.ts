import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { alterarSenhaAction } from '../../actions/login.actions';
import { NovaSenhaVo } from '../../../../vo/nova-senha.vo';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent implements OnInit {

  hashTrocaSenha: string;

  novaSenha: string;
  confirmacaoNovaSenha: string;

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.hashTrocaSenha = params.hashTrocaSenha;
    });
  }

  alterar(form: NgForm) {
    if (form.valid) {
      const novaSenhaVo = new NovaSenhaVo();

      novaSenhaVo.hashTrocaSenha = this.hashTrocaSenha;
      novaSenhaVo.novaSenha = this.novaSenha;
      novaSenhaVo.confirmacaoNovaSenha = this.confirmacaoNovaSenha;

      this.store.dispatch(alterarSenhaAction({ novaSenhaVo }));
    }
  }

}
