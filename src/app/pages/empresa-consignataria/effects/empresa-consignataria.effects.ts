import { BasePaginatorEffects } from '../../base.effects.paginator';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { EmpresaConsignatariaService } from '../../../services/empresa-consignataria.service';
import { EmpresaConsignataria } from 'src/app/models/empresa-consignataria';
import { PageSort } from '../../../vo/page.sort';
import * as EmpresaConsignatariaActions from '../actions/empresa-consignataria.actions';
import { PessoaService } from '../../../services/pessoa.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { TipoPessoaEnum } from '../../../enums/tipo.pessoa';
import { StatusRegistroEnum } from '../../../enums/status.registro';
import { selectEmpresaConsignatariaState } from '../selectors/empresa-consignataria.selectors';
import { BancoService } from '../../../services/banco.service';

export class EmpresaConsignatariaEffects extends BasePaginatorEffects {

    countEmpresaConsignataria$ = super.baseCreateCount(EmpresaConsignatariaActions.countEmpresaConsignataria,
        EmpresaConsignatariaActions.countEmpresaConsignatariaSucesso, EmpresaConsignatariaActions.countEmpresaConsignatariaErro);

    countEmpresaConsignatariaSucesso$ = super.baseCreateCountSuccess(EmpresaConsignatariaActions.countEmpresaConsignatariaSucesso);

    pesquisarEmpresaConsignataria$ = super.baseCreateFind(EmpresaConsignatariaActions.pesquisarEmpresaConsignataria,
        selectEmpresaConsignatariaState, EmpresaConsignatariaActions.pesquisarEmpresaConsignatariaSucesso,
        EmpresaConsignatariaActions.pesquisarEmpresaConsignatariaErro);

    salvarEmpresaConsignataria$ = super.baseCreateSave(EmpresaConsignatariaActions.salvarEmpresaConsignataria,
        EmpresaConsignatariaActions.salvarEmpresaConsignatariaSucesso);

    atualizarStatus = super.baseCreateUpdateStatus(EmpresaConsignatariaActions.atualizarStatusEmpresaConsignataria,
        EmpresaConsignatariaActions.atualizarStatusEmpresaConsignatariaSucesso);

    consultarPessoasJuridicas$ = createEffect(() => this.actions$.pipe(
        ofType(EmpresaConsignatariaActions.consultarPessoasJuridicasEmpCons),
        mergeMap(() => {
            return this.pessoaService.recuperarPorTipoStatus(TipoPessoaEnum.JURIDICA, StatusRegistroEnum.ATIVO).pipe(
                map(pessoasJuridicas => EmpresaConsignatariaActions.consultarPessoasJuriticasEmpConsSucesso({ pessoasJuridicas })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    consultarBancos$ = createEffect(() => this.actions$.pipe(
        ofType(EmpresaConsignatariaActions.consultarBancosEmpCons),
        mergeMap(() => {
            return this.bancoService.listarAtivos().pipe(
                map(bancos => EmpresaConsignatariaActions.consultarBancosEmpConsSucesso({ bancos })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private empresaConsignatariaService: EmpresaConsignatariaService,
                private pessoaService: PessoaService,
                private bancoService: BancoService) {
        super(actions$, store);
    }

    countRegistros(filtro: EmpresaConsignataria) {
        return this.empresaConsignatariaService.count(filtro);
    }
    findRegistros(pageSort: PageSort<EmpresaConsignataria>) {
        return this.empresaConsignatariaService.pesquisar(pageSort);
    }
    saveRegistro(registro: EmpresaConsignataria) {
        return this.empresaConsignatariaService.salvar(registro);
    }
    updateStatus(registro: EmpresaConsignataria) {
        return this.empresaConsignatariaService.atualizarStatus(registro);
    }
}
