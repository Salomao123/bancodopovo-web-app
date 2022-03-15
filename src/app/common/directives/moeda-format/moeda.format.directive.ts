import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appMoedaFormat]'
})
export class MoedaFormatDirective {

    constructor(private el: ElementRef,
                private ngControl: NgControl) {}

    @HostListener('input', ['$event'])
    onInputChange(event: any) {
        let value = event.target.value.replace(/\D/g, '');

        let formatado = '';
        if (value) {

            const teste = value.replace(',', '.');

            if (value.trim().length > 0) {
                if (Number(teste) !== 0) {
                    value = this.removerPontosVirgulas(value);

                    if (value.length === 1) {
                        formatado = '0,0' + value;
                    } else if (value.length === 2) {
                        formatado = '0,' + value;
                    } else {
                        let stringTmp = '';
                        let numeroCaracteresGrupo: number;
                        for (let i = value.length; i >= 0; i--) {
                            if (i === value.length - 3) {
                                stringTmp += ',';
                                numeroCaracteresGrupo = 0;
                            }

                            if (numeroCaracteresGrupo === 3) {
                                stringTmp += '.';
                                numeroCaracteresGrupo = 0;
                            }

                            stringTmp += value.charAt(i);
                            numeroCaracteresGrupo++;
                        }
                        formatado = stringTmp.split('').reverse().join('');
                    }

                    if (formatado.startsWith('0')) {
                        formatado = formatado.replace('0', '');
                    }

                    if (formatado.startsWith(',')) {
                        formatado = '0' + formatado;
                    }

                } else {
                    formatado = '0,00';
                }
            }

        }


        // event.target.value = (formatado) ? 'R$ ' + formatado : '';
        event.target.value = formatado;
    }

    removerPontosVirgulas(valor: string) {
        let stringTmp = '';
        if (valor) {
            for (let i = 0; i <= valor.length; i++) {
                if (valor.charAt(i) !== '.' && valor.charAt(i) !== ',') {
                    stringTmp += valor.charAt(i);
                }
            }
        }
        return stringTmp;
    }


    @HostListener('blur', ['$event.target.value'])
    onBlurDate(value: any): void {
        this.ngControl.control.setValue(value);
    }
}
