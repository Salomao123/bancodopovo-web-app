import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { EmprestimosService } from '../../../services/emprestimos.service';
import * as EmprestimosActions from '../actions/emprestimos.action';
import { Emprestimo } from '../../../models/emprestimo';
import { selectEmprestimoState } from '../selectors/emprestimos.selectors';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { PageSort } from '../../../vo/page.sort';

@Injectable()
export class EmprestimosEffects extends BasePaginatorEffects {

    countEmprestimo$ = super.baseCreateCount(EmprestimosActions.countEmprestimo, EmprestimosActions.countEmprestimoSucesso, EmprestimosActions.countEmprestimoErro);

    countEmprestimoSucesso$ = super.baseCreateCountSuccess(EmprestimosActions.countEmprestimoSucesso);

    pesquisarEmprestimo$ = super.baseCreateFind(EmprestimosActions.pesquisarEmprestimo, selectEmprestimoState,
        EmprestimosActions.pesquisarEmprestimoSucesso, EmprestimosActions.pesquisarEmprestimoErro);

    salvarEmprestimo$ = super.baseCreateSave(EmprestimosActions.salvarEmprestimo, EmprestimosActions.salvarEmprestimoSucesso);

    atualizarStatus = super.baseCreateUpdateStatus(EmprestimosActions.atualiarStatusEmprestimo, EmprestimosActions.atualizarStatusEmprestimoSucesso);

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private emprestimosService: EmprestimosService) {
        super(action$, store);
    }

    countRegistros(filtro: Emprestimo) {
        return this.emprestimosService.count(filtro);
    }

    findRegistros(pageSort: PageSort<Emprestimo>) {
        return this.emprestimosService.pesquisar(pageSort);
    }

    saveRegistro(registro: Emprestimo) {
        return this.emprestimosService.salvar(registro);
    }

    updateStatus(registro: Emprestimo) {
        return this.emprestimosService.atualizarStatus(registro);
    }
}
