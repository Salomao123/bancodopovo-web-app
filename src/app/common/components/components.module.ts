import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardBodyComponent } from './card-body/card-body.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { ModalComponent } from './modal/modal.component';
import { ModalBodyComponent } from './modal-body/modal-body.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { ReportPrintComponent } from './report-print/report-print.component';


@NgModule({
  declarations: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardInfoComponent,
    CardFooterComponent,
    ModalComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalConfirmacaoComponent,
    ReportPrintComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    CardInfoComponent,
    ModalComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalConfirmacaoComponent,
    ReportPrintComponent
  ]
})
export class ComponentsModule { }
