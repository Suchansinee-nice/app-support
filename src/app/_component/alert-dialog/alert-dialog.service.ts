import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertDialogComponent, AlertType } from './alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {
  constructor(private modalService: NgbModal) { }

  alert(
    message: string = '',
    title: string = '',
    btnOk: string = '',
    btnCancel: string = '',
    alertType: AlertType
  ): Promise<boolean> {
    const modalRef = this.modalService.open(AlertDialogComponent, { centered: true });
    const componentInstance = modalRef.componentInstance as AlertDialogComponent;
    componentInstance.setData(title, message, btnOk, btnCancel, alertType);

    return modalRef.result.then(
      (result) => result === true,
      () => false
    );
  }

  confirm(
    message: string = 'ยืนยันข้อมูล',
    title: string = 'Confirm',
    btnOk: string = 'ยืนยัน',
    btnCancel: string = 'ยกเลิก'
  ): Promise<boolean> {
    return this.alert(message, title, btnOk, btnCancel, AlertType.Confirm)
  }

  success(
    message: string = 'บันทึกข้อมูลสำเร็จ',
    title: string = 'แจ้งเตือน',
    btnOk: string = 'ตกลง',
  ): Promise<boolean> {
    return this.alert(message,title,btnOk, "", AlertType.Success)
  }

  fail(
    message: string = 'Error',
    title: string = 'แจ้งเตือน',
    btnOk: string = 'ตกลง',
  ): Promise<boolean> {
    return this.alert(message,title,btnOk, "", AlertType.Fail)
  }
}
