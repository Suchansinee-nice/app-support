import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export enum AlertType {
  Confirm = 'Confirm',
  Success = 'Success',
  Fail = 'Fail',
}


@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.css'],
    standalone: false
})
export class AlertDialogComponent {
  title: string = 'Alert';
  message: string = 'Are you sure?';
  btnOkText: string = 'OK';
  btnCancelText!: string;
  alertType: AlertType = AlertType.Success

  constructor(public activeModal: NgbActiveModal) {}

  setData(title: string, message: string, btnOk: string, btnCancel: string, alertType: AlertType) {
    this.title = title;
    this.message = message;
    this.btnOkText = btnOk;
    this.btnCancelText = btnCancel;
    this.alertType = alertType;
  }
}
