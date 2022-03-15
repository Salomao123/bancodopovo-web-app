import { BaseEffects } from '../../base.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import * as ConsultaConvenioActions from '../actions/consulta-convenio.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConvenioService } from '../../../services/convenio.service';
import { Pessoa } from '../../../models/pessoa';

export class ConsultaConvenioEffects extends BaseEffects {

    consultarConvenio$ = createEffect(() => this.actions$.pipe(
        ofType(ConsultaConvenioActions.consultarConvenio),
        mergeMap(action => {
            const pessoa = new Pessoa();
            pessoa.documento = action.cnpj;
            return this.convenioService.consultarPorEmpresa(pessoa).pipe(
                map(convenio => ConsultaConvenioActions.consultarConvenioSucesso({ convenio })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ConsultaConvenioActions.consultarConvenioErro());
                })
            );
        })
    ));

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private convenioService: ConvenioService) {
        super();
    }
}
