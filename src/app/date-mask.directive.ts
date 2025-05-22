import { Directive, HostListener, ElementRef, Renderer2, Input, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[dateMask]',
    standalone: false
})
export class DateMaskDirective {
    @Output() dateMaskChange = new EventEmitter<string>();

    constructor(private el: ElementRef, private ngModel: NgModel) {

    }

    ngOnInit() {
    }

    @HostListener('input', ['$event'])
    onInput(event: Event) {
        let cursorPos = this.el.nativeElement.selectionStart || 0

        let value = this.el.nativeElement.value.replace(/\D/g, ''); // ลบอักขระที่ไม่ใช่ตัวเลข
        if (value.length > 8) value = value.substring(0, 8); // จำกัดไม่ให้เกิน 8 ตัว

        let formatted = '';
        if (value.length > 4) {
            formatted = `${value.substring(0, 2)}/${value.substring(2, 4)}/${value.substring(4)}`;
        } else if (value.length > 2) {
            formatted = `${value.substring(0, 2)}/${value.substring(2)}`;
        } else {
            formatted = value;
        }

        this.el.nativeElement.value = formatted

        const inputEvent = event as InputEvent;
        if (inputEvent.inputType === 'deleteContentBackward') {
            this.el.nativeElement.setSelectionRange(cursorPos, cursorPos);
        } else {
            if (formatted.charAt(cursorPos - 1) === "/") {
                cursorPos += 2;
            }
            this.el.nativeElement.setSelectionRange(cursorPos, cursorPos);
        }
    }

    @HostListener('blur')
    onBlur() {
        const value: string = this.el.nativeElement.value;
        if (!this.isValidDate(value)) {
            this.ngModel.update.emit("")
        } else {
            // const parts = value.split('/').map(part => parseInt(part, 10));
            // console.log("-->"+parts[2])
            // if (parts.length === 3) {
            //     const day = parts[0].toString().padStart(2, '0');
            //     const month = parts[1].toString().padStart(2, '0');
            //     const year = (parts[2] - 543).toString();
            //     this.el.nativeElement.value = `${day}/${month}/${year}`
            // }
        }
    }

    isValidDate(dateStr: string): boolean {
        const dateParts = dateStr.split('/');
        if (dateParts.length !== 3) return false;

        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);

        if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
        if (month < 1 || month > 12) return false;
        if (year < 2400) return false;

        const daysInMonth = new Date(year, month, 0).getDate();
        return day > 0 && day <= daysInMonth;
    }
}
