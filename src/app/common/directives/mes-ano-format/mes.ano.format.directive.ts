import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appMesAnoFormat]'
})
export class MesAnoFormatDirective {

    constructor(private el: ElementRef,
                private ngControl: NgControl) {}

    @HostListener('input', ['$event'])
    onInputChange(event: any) {
        const value = event.target.value.replace(/\D/g, '');
        event.target.value = value.replace(/(\d{2})(\d{3})/g, '\$1/\$2');
    }

    @HostListener('blur', ['$event.target.value'])
    onBlurDate(value: any): void {
        this.ngControl.control.setValue(value);
    }
}
