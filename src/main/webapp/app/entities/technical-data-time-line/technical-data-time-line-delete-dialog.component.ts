import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';
import { TechnicalDataTimeLineService } from './technical-data-time-line.service';

@Component({
  templateUrl: './technical-data-time-line-delete-dialog.component.html'
})
export class TechnicalDataTimeLineDeleteDialogComponent {
  technicalDataTimeLine?: ITechnicalDataTimeLine;

  constructor(
    protected technicalDataTimeLineService: TechnicalDataTimeLineService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.technicalDataTimeLineService.delete(id).subscribe(() => {
      this.eventManager.broadcast('technicalDataTimeLineListModification');
      this.activeModal.close();
    });
  }
}
