import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReportBrokenEquipment } from 'app/shared/model/report-broken-equipment.model';
import { ReportBrokenEquipmentService } from './report-broken-equipment.service';

@Component({
  templateUrl: './report-broken-equipment-delete-dialog.component.html'
})
export class ReportBrokenEquipmentDeleteDialogComponent {
  reportBrokenEquipment?: IReportBrokenEquipment;

  constructor(
    protected reportBrokenEquipmentService: ReportBrokenEquipmentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reportBrokenEquipmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('reportBrokenEquipmentListModification');
      this.activeModal.close();
    });
  }
}
