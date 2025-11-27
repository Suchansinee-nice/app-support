import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertDialogService } from '../../../_component/alert-dialog/alert-dialog.service';

@Component({
    selector: 'app-add-edit-address',
    templateUrl: './add-edit-address.component.html',
    styleUrl: './add-edit-address.component.css',
    standalone: false
})
export class AddEditAddressComponent {
  
  constructor(public activeModal: NgbActiveModal
    , private alertService: AlertDialogService
  ) {}

  async save() {
    
  }
  
  close() {
    this.activeModal.close('Closed');
  }
}
