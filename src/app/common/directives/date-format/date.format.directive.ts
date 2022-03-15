import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appDateFormat]'
})
export class DateFormatDirective {

    constructor(private _el: ElementRef) {}

    @HostListener('input', ['$event'])
    onInputChange(event: any) {
        let cursorPosition = event.target.selectionEnd;

        if (event.inputType === 'deleteContentBackward' && (cursorPosition === 2 || cursorPosition === 5)) {
            event.target.value = event.target.value.substring(0, cursorPosition - 1) + event.target.value.substring(cursorPosition);
            cursorPosition --;
        }
        if (event.inputType === 'insertText' && (event.target.value.length > 10)) {
            event.target.value = event.target.value.substring(0, event.target.value.length - 1);
        }

        let dateMask;

        dateMask = event.target.value.toString();
        dateMask = dateMask.replace(/\D/g, '');

        let mask = '';
        for (let i = 0; i < dateMask.length; i++) {
            mask += dateMask[i];
            if (i === 1 || i === 3) {
                mask += '/';
                if (cursorPosition === 2 || cursorPosition === 5) { cursorPosition++; }
            }
        }
        event.target.value = mask.toString();
        event.target.selectionStart = cursorPosition;
        event.target.selectionEnd = cursorPosition;

        if (event.target.value.length === 10) {
            // const dt = this.stringToDate(event.target.value);
            // if (this.isValidDate(dt)) {
                this._el.nativeElement.value = event.target.value;
            // }
        }
    }

    @HostListener('blur', [])
    onBlurDate(): void {
        // check if date is valid
    }

}
