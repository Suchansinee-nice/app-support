import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditAddressComponent } from '../collection/add-edit-address/add-edit-address.component';
import { OccupationLookupComponent } from '../../lookup/occupation-lookup/occupation-lookup.component';
import { OccupationService } from '../../lookup/occupation-lookup/occupation.service';

@Component({
    selector: 'app-eap0001scr03',
    templateUrl: './eap0001scr03.component.html',
    styleUrl: './eap0001scr03.component.scss',
    standalone: false
})
export class Eap0001scr03Component {
  custType = "Y"
  occCode = "1111"

  constructor(private modalService: NgbModal, private occService: OccupationService
  ) { }

  addEditAddress() {
    this.modalService.open(AddEditAddressComponent, {
      size: 'lg', // ขนาด modal (sm, lg, xl)
      backdrop: 'static', // กำหนดให้ modal ปิดไม่ได้จากคลิกข้างนอก
    });
  }
}
