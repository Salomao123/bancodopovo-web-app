import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-report-print',
  templateUrl: './report-print.component.html',
  styleUrls: ['./report-print.component.scss']
})
export class ReportPrintComponent implements OnInit {

  @BlockUI()
  blockUI: NgBlockUI;

  @Input()
  templateRelatorio: TemplateRef<any>;

  @Input()
  impressaoCss: string;

  habilitarPrint: boolean;

  constructor() {
    this.habilitarPrint = false;
  }

  ngOnInit() {
  }

  print() {
    this.blockUI.start();
    this.habilitarPrint = true;

    setTimeout(() => {
      this.printReport();
      this.habilitarPrint = false;
      this.blockUI.stop();

    }, 2000);
  }

  printReport() {
    const printFrame = 'printframe';

    const printContents = document.getElementById('idRelTemplate').outerHTML;
    const popupWin = window.frames[printFrame];

    popupWin.document.write(`
      <html>
        <head>
          <title>Banco do Povo</title>
          <style type="text/css">
          //........Customized style.......
          ${this.impressaoCss}
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
        <script type="text/javascript">
          window.onafterprint = function() {
            
          };
        </script>
      </html>`
    );

    popupWin.document.close();
  }
}
