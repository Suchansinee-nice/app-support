import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }],
    standalone: false
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() value: string = 'Y'
  @Input() name: string = '';
  @Input() id: string = '';
  @Output() change = new EventEmitter<any>();

  isChecked = false;

  onChange = (value: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.isChecked = (this.value === value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
    this.onChange(this.isChecked ? this.value : null);
    this.onTouched();
  }
}
