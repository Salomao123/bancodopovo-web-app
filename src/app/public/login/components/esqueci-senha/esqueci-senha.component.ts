import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers/index';
import { NgForm } from '@angular/forms';
import { solicitarTrocaSenhaAction } from '../../actions/login.actions';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss']
})
export class EsqueciSenhaComponent implements OnInit {

  email: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  solicitarTroca(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(solicitarTrocaSenhaAction({ email: this.email }));
    }
  }

}
