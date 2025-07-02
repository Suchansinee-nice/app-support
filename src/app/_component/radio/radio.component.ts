import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrl: './radio.component.scss',
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioComponent),
            multi: true
        }],
    standalone: false
})
export class RadioComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() value!: [string];
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() options: Array<{ code: string, name: string }> = [];
  @Input() disabled = false
  @Output() change = new EventEmitter<any>();

  modelValue: any;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.modelValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectValue(value: string): void {
    this.modelValue = value;
    this.onChange(value);
    this.onTouched();
  }

}
