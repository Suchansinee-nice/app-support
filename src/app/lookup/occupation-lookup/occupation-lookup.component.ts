import { ChangeDetectorRef, Component, ElementRef, forwardRef, Renderer2, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccupationService } from './occupation.service';
import { DatatableComponent } from '../../_component/datatable/datatable.component';
import { EappComponent } from '../../eapp.component';

@Component({
    selector: 'lk-occupation',
    templateUrl: './occupation-lookup.component.html',
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OccupationLookupComponent),
            multi: true
        }],
    standalone: false
})
export class OccupationLookupComponent extends EappComponent implements ControlValueAccessor {

  modelValue: any;
  description = ''

  data: any = []

  @ViewChild('datatable')
  datatable!: DatatableComponent;

  @ViewChild('table')
  table!: ElementRef;

  constructor(private modalService: NgbModal
    , private cdRef: ChangeDetectorRef, private occService: OccupationService, private renderer: Renderer2) {
    super();
  }

  onChange = (value: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.modelValue = value;
    this.getByCode()
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  getByCode() {
    if (this.modelValue) {
      const result = this.occService.getByCode(this.modelValue)

      if (result && result.length > 0) {
        this.description = result[0].desc
      } else {
        this.modelValue = null
        this.description = ''
      }

      this.onChange(this.modelValue);
      this.onTouched();
    }
  }

  search() {
    this.data = this.occService.list()
    this.initDatatable(this.data, this.datatable, this.table, this.renderer)
  }

  datatabletFilter(data: any) {
    if (this.data) {
      this.data = data
      this.cdRef.detectChanges()
    }
  }
}
