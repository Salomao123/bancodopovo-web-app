import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatDirective } from './date-format/date.format.directive';
import { CpfFormatDirective } from './cpf-format/cpf.format.directive';
import { CnpjFormatDirective } from './cnpj-format/cnpj.format.directive';
import { CepFormatDirective } from './cep-format/cep.format.directive';
import { TelefoneFormatDirective } from './telefone-format/telefone.format.directive';
import { RgFormatDirective } from './rg-format/rg.format.directive';
import { MoedaFormatDirective } from './moeda-format/moeda.format.directive';
import { NumeroFormatDirective } from './numero-format/numero.format.directive';
import { MesAnoFormatDirective } from './mes-ano-format/mes.ano.format.directive';


@NgModule({
  declarations: [
    DateFormatDirective,
    CpfFormatDirective,
    CnpjFormatDirective,
    CepFormatDirective,
    TelefoneFormatDirective,
    RgFormatDirective,
    MoedaFormatDirective,
    NumeroFormatDirective,
    MesAnoFormatDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateFormatDirective,
    CpfFormatDirective,
    CnpjFormatDirective,
    CepFormatDirective,
    TelefoneFormatDirective,
    RgFormatDirective,
    MoedaFormatDirective,
    NumeroFormatDirective,
    MesAnoFormatDirective
  ]
})
export class DirectivesModule { }
