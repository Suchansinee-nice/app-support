import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccupationService } from '../occupation-lookup/occupation.service';

@Component({
    selector: 'lk-plan',
    templateUrl: './plan-lookup.component.html',
    standalone: false
})
export class PlanLookupComponent {
  constructor(private modalService: NgbModal
    , private cdRef: ChangeDetectorRef, private occService: OccupationService, private renderer: Renderer2) {
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }
}
