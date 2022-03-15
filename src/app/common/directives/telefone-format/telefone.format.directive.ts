import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appTelefoneFormat]'
})
export class TelefoneFormatDirective {

    constructor(private el: ElementRef,
                private ngControl: NgControl) {}

    @HostListener('input', ['$event'])
    onInputChange(event: any) {
        let value = event.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');    // Coloca hífen entre o quarto e o quinto dígitos

        event.target.value = value;
        this.el.nativeElement.value = event.target.value;
    }

    @HostListener('blur', ['$event.target.value'])
    onBlurDate(value: any): void {
        this.ngControl.control.setValue(value);
    }
}
