import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInRepositoryDetails } from 'app/shared/model/in-repository-details.model';
import { InRepositoryDetailsService } from './in-repository-details.service';

@Component({
  templateUrl: './in-repository-details-delete-dialog.component.html'
})
export class InRepositoryDetailsDeleteDialogComponent {
  inRepositoryDetails?: IInRepositoryDetails;

  constructor(
    protected inRepositoryDetailsService: InRepositoryDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inRepositoryDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('inRepositoryDetailsListModification');
      this.activeModal.close();
    });
  }
}
