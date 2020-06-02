import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';
import { InOutRepositoryDetailsService } from './in-out-repository-details.service';

@Component({
  templateUrl: './in-out-repository-details-delete-dialog.component.html'
})
export class InOutRepositoryDetailsDeleteDialogComponent {
  inOutRepositoryDetails?: IInOutRepositoryDetails;

  constructor(
    protected inOutRepositoryDetailsService: InOutRepositoryDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inOutRepositoryDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('inOutRepositoryDetailsListModification');
      this.activeModal.close();
    });
  }
}
