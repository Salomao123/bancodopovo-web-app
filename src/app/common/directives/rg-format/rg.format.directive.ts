import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appRgFormat]'
})
export class RgFormatDirective {

    constructor(private el: ElementRef,
                private ngControl: NgControl) {}

    @HostListener('input', ['$event'])
    onInputChange(event: any) {
        let value = event.target.value.replace(/\D/g, '');

        if (value.length === 9) {
            value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
        }
        if (value.length === 8) {
            value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
        }
        if (value.length === 7) {
            value = value.replace(/(\d{1})(\d{3})(\d{3})$/, '$1.$2.$3');
        }

        event.target.value = value;
    }

    @HostListener('blur', ['$event.target.value'])
    onBlurDate(value: any): void {
        this.ngControl.control.setValue(value);
    }
}
